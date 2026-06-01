/**
 * Process Cypress screenshots into Gumroad-ready images.
 * - Cover: 1280x720 at 72 DPI (PNG)
 * - Thumbnail: 600x600 square crop (PNG)
 * Run: node scripts/process-gumroad-images.js
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SCREENSHOTS_DIR = path.join(
  __dirname,
  "..",
  "cypress",
  "screenshots",
  "gumroad-screenshots.cy.ts"
);
const OUTPUT_DIR = path.join(__dirname, "..", "cypress", "screenshots", "gumroad-ready");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function main() {
  console.log("Processing Gumroad images...\n");

  // ── Cover image: 1280x720 at 72 DPI ──────────────────────────────────────
  const coverInput = path.join(SCREENSHOTS_DIR, "01-landing-hero.png");
  const coverOutput = path.join(OUTPUT_DIR, "gumroad-cover-1280x720.png");

  await sharp(coverInput)
    .resize(1280, 720, { fit: "cover", position: "top" })
    .withMetadata({ density: 72 })
    .png()
    .toFile(coverOutput);

  console.log("✓ Cover image:     gumroad-cover-1280x720.png  (1280×720, 72 DPI)");

  // ── Thumbnail: 600x600 square crop from center ────────────────────────────
  const thumbInput = path.join(SCREENSHOTS_DIR, "01-landing-hero.png");
  const thumbOutput = path.join(OUTPUT_DIR, "gumroad-thumbnail-600x600.png");

  await sharp(thumbInput)
    .resize(600, 600, { fit: "cover", position: "centre" })
    .withMetadata({ density: 72 })
    .png()
    .toFile(thumbOutput);

  console.log("✓ Thumbnail:       gumroad-thumbnail-600x600.png  (600×600, PNG)");

  // ── Also export thumbnail as JPG ─────────────────────────────────────────
  const thumbJpgOutput = path.join(OUTPUT_DIR, "gumroad-thumbnail-600x600.jpg");

  await sharp(thumbInput)
    .resize(600, 600, { fit: "cover", position: "centre" })
    .withMetadata({ density: 72 })
    .jpeg({ quality: 95 })
    .toFile(thumbJpgOutput);

  console.log("✓ Thumbnail (JPG): gumroad-thumbnail-600x600.jpg  (600×600, JPG)");

  // ── Gallery images: resize to 1280x720 ───────────────────────────────────
  const galleryFiles = [
    { file: "03-tech-stack.png", name: "gallery-tech-stack" },
    { file: "06-lesson-content.png", name: "gallery-lesson" },
    { file: "08-quiz-interface.png", name: "gallery-quiz" },
    { file: "10-certificate.png", name: "gallery-certificate" },
    { file: "09-pricing.png", name: "gallery-pricing" },
  ];

  for (const { file, name } of galleryFiles) {
    const input = path.join(SCREENSHOTS_DIR, file);
    const output = path.join(OUTPUT_DIR, `${name}-1280x720.png`);

    if (fs.existsSync(input)) {
      await sharp(input)
        .resize(1280, 720, { fit: "cover", position: "top" })
        .withMetadata({ density: 72 })
        .png()
        .toFile(output);
      console.log(`✓ Gallery:         ${name}-1280x720.png`);
    }
  }

  console.log(`\nAll images saved to:\n  ${OUTPUT_DIR}`);
  console.log("\nGumroad upload guide:");
  console.log("  Cover:     gumroad-cover-1280x720.png");
  console.log("  Thumbnail: gumroad-thumbnail-600x600.png (or .jpg)");
  console.log("  Gallery:   gallery-*.png (upload as product images)");
}

main().catch(console.error);
