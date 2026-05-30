/**
 * Submit URLs to search engines via IndexNow protocol.
 * IndexNow notifies: Bing, Yandex, Naver, Seznam, and others.
 * 
 * Run: node scripts/submit-indexnow.js
 */

const https = require("https");

const HOST = "learnhowtobuildaiagents.com";
const KEY = "ai-agent-academy-indexnow-key";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// All important URLs to submit
const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/courses`,
  `https://${HOST}/pricing`,
  `https://${HOST}/privacy`,
  `https://${HOST}/terms`,
  `https://${HOST}/certificate/preview`,
  // Localized homepages
  `https://${HOST}/es`,
  `https://${HOST}/fr`,
  `https://${HOST}/de`,
  `https://${HOST}/ja`,
  `https://${HOST}/ko`,
  `https://${HOST}/zh-CN`,
  `https://${HOST}/pt-BR`,
  `https://${HOST}/ru`,
  `https://${HOST}/ar`,
  `https://${HOST}/hi`,
];

// IndexNow endpoints (submitting to one notifies all participating engines)
const INDEXNOW_ENDPOINTS = [
  "api.indexnow.org",
  "www.bing.com",
  "yandex.com",
];

function submitToEndpoint(endpoint) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: URLS,
    });

    const options = {
      hostname: endpoint,
      port: 443,
      path: "/indexnow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        resolve({ endpoint, status: res.statusCode, body: data });
      });
    });

    req.on("error", (err) => {
      resolve({ endpoint, status: "ERROR", body: err.message });
    });

    req.write(payload);
    req.end();
  });
}

async function main() {
  console.log(`Submitting ${URLS.length} URLs via IndexNow...\n`);
  console.log("URLs:");
  URLS.forEach((url) => console.log(`  ${url}`));
  console.log("");

  const results = await Promise.all(
    INDEXNOW_ENDPOINTS.map(submitToEndpoint)
  );

  console.log("Results:");
  for (const { endpoint, status, body } of results) {
    const icon = status === 200 || status === 202 ? "✓" : "✗";
    console.log(`  ${icon} ${endpoint}: ${status}${body ? ` - ${body}` : ""}`);
  }

  console.log("\nNote: Status 200/202 = accepted. 429 = rate limited (try later).");
  console.log("IndexNow shares submissions across Bing, Yandex, Naver, Seznam, and others.");
}

main();
