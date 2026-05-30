/**
 * Submit sitemap to major search engines.
 * Run: node scripts/submit-sitemap.js
 */

const https = require("https");

const SITEMAP_URL = "https://learnhowtobuildaiagents.com/sitemap.xml";

const PING_URLS = [
  // Google
  `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  // Bing (also covers Yahoo)
  `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  // Yandex
  `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
];

function ping(url) {
  return new Promise((resolve) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve({ url: new URL(url).hostname, status: res.statusCode });
        });
      })
      .on("error", (err) => {
        resolve({ url: new URL(url).hostname, status: `ERROR: ${err.message}` });
      });
  });
}

async function main() {
  console.log(`Submitting sitemap: ${SITEMAP_URL}\n`);

  const results = await Promise.all(PING_URLS.map(ping));

  console.log("Results:");
  for (const { url, status } of results) {
    const icon = status === 200 ? "✓" : "✗";
    console.log(`  ${icon} ${url}: ${status}`);
  }

  console.log("\n--- Manual Registration Links ---");
  console.log("Google Search Console:  https://search.google.com/search-console");
  console.log("Bing Webmaster Tools:   https://www.bing.com/webmasters");
  console.log("Yandex Webmaster:       https://webmaster.yandex.com");
  console.log("Baidu Webmaster:        https://ziyuan.baidu.com");
  console.log("Naver Search Advisor:   https://searchadvisor.naver.com");
  console.log("DuckDuckGo:             Uses Bing index (no separate submission needed)");
  console.log("Yahoo:                  Uses Bing index (no separate submission needed)");
}

main();
