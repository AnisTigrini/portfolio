#!/usr/bin/env node
// Refreshes assets/data/thm.json from TryHackMe's public profile API.
//
// The API does not send CORS headers, so the portfolio cannot call it from the
// browser. Instead this script runs at deploy time (see .github/workflows/static.yml)
// or locally with `node scripts/update-thm-data.mjs`, and the page reads the JSON.
//
// On any failure the existing JSON file is left untouched and the script exits 1.

import { writeFile } from "node:fs/promises";

const USERNAME = process.env.THM_USERNAME || "cuticletive61";
const API = "https://tryhackme.com/api/v2/public-profile";
const OUT = new URL("../assets/data/thm.json", import.meta.url);
const HEADERS = {
  Accept: "application/json",
  "User-Agent": "AnisTigrini-portfolio/1.0 (+https://github.com/AnisTigrini)"
};

async function get(path, params) {
  const url = new URL(API + path);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);

  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);

  const body = await res.json();
  if (body.status !== "success" || !body.data) throw new Error(`Unexpected response for ${url}`);
  return body.data;
}

async function getAllBadges() {
  const badges = [];
  for (let page = 1; page <= 20; page++) {
    const data = await get("/badges", { username: USERNAME, limit: 50, page });
    badges.push(...data.docs);
    if (!data.hasNextPage) break;
  }
  return badges.map(({ name, title, description, image, rarityTier, rarityPercent }) =>
    ({ name, title, description, image, rarityTier, rarityPercent }));
}

async function main() {
  const year = new Date().getUTCFullYear();

  const profile = await get("", { username: USERNAME });
  if (profile.isPrivateProfile) throw new Error(`Profile ${USERNAME} is private`);

  const [badges, activity] = await Promise.all([
    getAllBadges(),
    get("/yearly-activity", { username: USERNAME, year })
  ]);

  const data = {
    updatedAt: new Date().toISOString(),
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
      year,
      totalCount: activity.totalCount,
      // only active days are stored; the page fills in the rest of the year
      days: activity.yearlyActivity
        .filter((day) => day.count > 0)
        .map(({ date, count, level, breakdown }) => ({ date, count, level, breakdown }))
    }
  };

  await writeFile(OUT, JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${OUT.pathname}: ${badges.length} badges, ${data.activity.days.length} active days in ${year}`);
}

main().catch((err) => {
  console.error(`TryHackMe refresh failed, keeping existing data: ${err.message}`);
  process.exit(1);
});
