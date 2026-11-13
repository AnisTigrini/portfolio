// Saves your TryHackMe public profile data so the portfolio can show it.
//
// TryHackMe blocks automated requests (scripts, GitHub Actions) with a bot
// challenge, but your browser has already passed it. So:
//
//   1. Open https://tryhackme.com in your browser (logged in or not).
//   2. Open DevTools (F12) > Console, paste this whole file, press Enter.
//      It downloads thm-raw.json.
//   3. In the portfolio folder run:
//        node scripts/update-thm-data.mjs --from ~/Downloads/thm-raw.json
//   4. Commit assets/data/thm.json and push.
//
// It only reads public profile endpoints; nothing is sent anywhere else.

(async () => {
  const USERNAME = "cuticletive61";
  const year = new Date().getUTCFullYear();

  const get = async (path, params) => {
    const url = new URL("/api/v2/public-profile" + path, location.origin);
    for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`${res.status} for ${url}`);
    return res.json();
  };

  const profile = await get("", { username: USERNAME });

  const badgePages = [];
  for (let page = 1; page <= 20; page++) {
    const body = await get("/badges", { username: USERNAME, limit: 50, page });
    badgePages.push(body);
    if (!body.data || !body.data.hasNextPage) break;
  }

  const activity = await get("/yearly-activity", { username: USERNAME, year });

  const raw = { fetchedAt: new Date().toISOString(), year, profile, badgePages, activity };
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([JSON.stringify(raw, null, 2)], { type: "application/json" }));
  link.download = "thm-raw.json";
  link.click();
  console.log("Saved thm-raw.json. Now run: node scripts/update-thm-data.mjs --from ~/Downloads/thm-raw.json");
})().catch((err) => console.error("TryHackMe export failed:", err));
