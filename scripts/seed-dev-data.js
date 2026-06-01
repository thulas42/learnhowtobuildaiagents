/**
 * Reset local dev data for Cypress and manual testing.
 * Usage: node scripts/seed-dev-data.js
 */
const fs = require("fs");
const path = require("path");

const dataDir = path.join(process.cwd(), "data");

const files = {
  "users.json": [],
  "progress.json": [],
  "subscriptions.json": [],
  "quiz-attempts.json": [],
  "certificates.json": [],
  "pending-eft.json": [],
  "notifications.json": [],
};

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

for (const [file, content] of Object.entries(files)) {
  fs.writeFileSync(
    path.join(dataDir, file),
    JSON.stringify(content, null, 2)
  );
}

console.log("Dev data directory reset:", dataDir);
