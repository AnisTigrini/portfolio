#!/usr/bin/env node
// Refreshes assets/data/thm.json from TryHackMe's public profile API.
//
// The API does not send CORS headers, so the portfolio cannot call it from the
// browser. Instead the page reads assets/data/thm.json, which this script writes.
//
// Two ways to run it:
//
//   node scripts/update-thm-data.mjs
//     Calls the API directly. This runs at deploy time (.github/workflows/static.yml),
//     but TryHackMe answers automated requests with a bot challenge (HTTP 429,
//     "This request requires a challenge to be completed"), so it usually fails.
//
//   node scripts/update-thm-data.mjs --from ~/Downloads/thm-raw.json
//     Uses API responses saved from your own browser with scripts/thm-export.browser.js.
//     This is the reliable way to refresh the data; commit the result.
//
// On any failure the existing JSON file is left untouched and the script exits 1.

import { readFile, writeFile } from "node:fs/promises";

const USERNAME = process.env.THM_USERNAME || "cuticletive61";
const API = "https://tryhackme.com/api/v2/public-profile";
const OUT = new URL("../assets/data/thm.json", import.meta.url);
const HEADERS = {
  Accept: "application/json",
  "User-Agent": "AnisTigrini-portfolio/1.0 (+https://github.com/AnisTigrini)"
};

// Every API response is { status: "success", data: {...} }
function unwrap(body, what) {
  if (!body || body.status !== "success" || !body.data) throw new Error(`Unexpected response for ${what}`);
  return body.data;
}

async function get(path, params) {
  const url = new URL(API + path);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

// Same shape as the file scripts/thm-export.browser.js downloads
async function fetchRaw() {
  const year = new Date().getUTCFullYear();
  const profile = await get("", { username: USERNAME });

  const badgePages = [];
  for (let page = 1; page <= 20; page++) {
    const body = await get("/badges", { username: USERNAME, limit: 50, page });
    badgePages.push(body);
    if (!unwrap(body, "badges").hasNextPage) break;
  }

  const activity = await get("/yearly-activity", { username: USERNAME, year });
  return { fetchedAt: new Date().toISOString(), year, profile, badgePages, activity };
}

function shape(raw) {
  const profile = unwrap(raw.profile, "profile");
  if (profile.isPrivateProfile) throw new Error(`Profile ${profile.username} is private`);

  const badges = raw.badgePages
    .flatMap((body) => unwrap(body, "badges").docs)
    .map(({ name, title, description, image, rarityTier, rarityPercent }) =>
      ({ name, title, description, image, rarityTier, rarityPercent }));

  const activity = unwrap(raw.activity, "yearly activity");

  return {
    updatedAt: raw.fetchedAt,
    username: profile.username,
    profile: {
      level: profile.level,
      rank: profile.rank,
      topPercentage: profile.topPercentage,
      totalPoints: profile.totalPoints,
      badgesNumber: profile.badgesNumber,
      completedRoomsNumber: profile.completedRoomsNumber,
      streak: profile.streak,
      largestStreak: profile.largestStreak,
      leagueTier: profile.leagueTier
    },
    badges,
    activity: {
      year: raw.year,
      totalCount: activity.totalCount,
      // only active days are stored; the page fills in the rest of the year
      days: activity.yearlyActivity
        .filter((day) => day.count > 0)
        .map(({ date, count, level, breakdown }) => ({ date, count, level, breakdown }))
    }
  };
}

async function main() {
  const fromIndex = process.argv.indexOf("--from");
  const raw = fromIndex === -1
    ? await fetchRaw()
    : JSON.parse(await readFile(process.argv[fromIndex + 1], "utf8"));

  const data = shape(raw);
  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${OUT.pathname}: ${data.badges.length} badges, ${data.activity.days.length} active days in ${data.activity.year}`);
}

main().catch((err) => {
  const message = `TryHackMe refresh failed, keeping existing data: ${err.message}`;
  // In GitHub Actions, show it as a warning on the run summary; the step itself
  // uses continue-on-error, so it would otherwise look like a success.
  console.error(process.env.GITHUB_ACTIONS ? `::warning::${message}` : message);
  process.exit(1);
});
