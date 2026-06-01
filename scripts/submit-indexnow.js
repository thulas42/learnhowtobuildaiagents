/**
 * Notify search engines of sitemap updates via IndexNow (Bing, Yandex, etc.)
 * Usage: NEXT_PUBLIC_SITE_URL=https://yoursite.com node scripts/submit-indexnow.js
 */
const fs = require("fs");
const path = require("path");

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://learnhowtobuildaiagents.com"
).replace(/\/$/, "");

const keyPath = path.join(
  process.cwd(),
  "public",
  "ai-agent-academy-indexnow-key.txt"
);

async function main() {
  if (!fs.existsSync(keyPath)) {
    console.error("IndexNow key file not found:", keyPath);
    process.exit(1);
  }

  const key = fs.readFileSync(keyPath, "utf-8").trim();
  const host = new URL(siteUrl).host;
  const keyLocation = `${siteUrl}/${path.basename(keyPath)}`;

  const body = {
    host,
    key,
    keyLocation,
    urlList: [`${siteUrl}/sitemap.xml`, siteUrl],
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  for (const endpoint of endpoints) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(endpoint, res.status, res.statusText);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
