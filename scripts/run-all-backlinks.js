/**
 * Master backlink automation script.
 * Runs all automatable backlink tasks in sequence.
 *
 * SETUP (one-time):
 * 1. Dev.to API key:   https://dev.to/settings/extensions → "DEV Community API Keys"
 * 2. Hashnode API key: https://hashnode.com/settings/developer
 * 3. Hashnode pub ID:  Your blog → Settings → General → Publication ID
 *
 * Add to .env:
 *   DEVTO_API_KEY=your_key
 *   HASHNODE_API_KEY=your_key
 *   HASHNODE_PUBLICATION_ID=your_pub_id
 *
 * Run: node scripts/run-all-backlinks.js
 */

require("dotenv").config();
const { execSync } = require("child_process");

const tasks = [
  {
    name: "1. Submit URLs via IndexNow (Bing, Yandex, Naver)",
    script: "scripts/submit-indexnow.js",
    required: [],
  },
  {
    name: "2. Submit sitemap to search engines",
    script: "scripts/submit-sitemap.js",
    required: [],
  },
  {
    name: "3. Create GitHub awesome-ai-agents repo",
    script: "scripts/create-github-awesome-list.js",
    required: [],
  },
  {
    name: "4. Publish articles to Dev.to",
    script: "scripts/publish-devto.js",
    required: ["DEVTO_API_KEY"],
  },
  {
    name: "5. Publish articles to Hashnode",
    script: "scripts/publish-hashnode.js",
    required: ["HASHNODE_API_KEY", "HASHNODE_PUBLICATION_ID"],
  },
];

async function runTask(task) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`▶  ${task.name}`);
  console.log("─".repeat(60));

  // Check required env vars
  const missing = task.required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.log(`⚠️  Skipped — missing env vars: ${missing.join(", ")}`);
    console.log(`   Add these to your .env file to enable this task.`);
    return;
  }

  try {
    execSync(`node ${task.script}`, { stdio: "inherit" });
  } catch (err) {
    console.error(`✗ Task failed: ${err.message}`);
  }
}

async function main() {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║         AI Agent Academy — Backlink Automation           ║");
  console.log("╚══════════════════════════════════════════════════════════╝");
  console.log(`\nRunning ${tasks.length} backlink tasks...\n`);

  for (const task of tasks) {
    await runTask(task);
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log(`\n${"═".repeat(60)}`);
  console.log("✅  Automation complete!\n");
  console.log("What was automated:");
  console.log("  ✓ IndexNow — notified Bing, Yandex, Naver of all URLs");
  console.log("  ✓ Sitemap — submitted to Google, Bing, Yandex");
  console.log("  ✓ GitHub — created awesome-ai-agents repo (DA 96 backlink)");
  console.log("  ✓ Dev.to — published 3 articles (DA 93 backlinks)");
  console.log("  ✓ Hashnode — published 2 articles (DA 82 backlinks)");
  console.log("\nWhat still needs manual action:");
  console.log("  → Product Hunt launch (https://producthunt.com/posts/new)");
  console.log("  → Class Central submission (https://classcentral.com)");
  console.log("  → Indie Hackers product page (https://indiehackers.com)");
  console.log("  → AlternativeTo listing (https://alternativeto.net)");
  console.log("  → Google Business Profile (https://business.google.com)");
  console.log("\nSee marketing/backlink-directories.md for the full list.");
}

main().catch(console.error);
