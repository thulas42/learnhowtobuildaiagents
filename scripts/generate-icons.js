/**
 * Generate PNG icons and favicon from the SVG logo.
 * Uses the `sharp` package if available, otherwise creates simple placeholder PNGs.
 * Run: node scripts/generate-icons.js
 */
const fs = require("fs");
const path = require("path");

async function main() {
  const svgPath = path.join(__dirname, "..", "public", "icon.svg");
  const svg = fs.readFileSync(svgPath);

  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.log("sharp not installed. Installing...");
    const { execSync } = require("child_process");
    execSync("npm install sharp --save-dev", {
      cwd: path.join(__dirname, ".."),
      stdio: "inherit",
    });
    sharp = require("sharp");
  }

  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "logo-google-oauth.png", size: 512 },
    { name: "og-image.png", size: null }, // special: 1200x630
  ];

  for (const { name, size } of sizes) {
    const outputPath = path.join(__dirname, "..", "public", name);

    if (name === "og-image.png") {
      // Create OG image: 1200x630 with logo centered
      await sharp(svg)
        .resize(400, 400, { fit: "contain", background: { r: 37, g: 99, b: 235, alpha: 1 } })
        .extend({
          top: 115,
          bottom: 115,
          left: 400,
          right: 400,
          background: { r: 37, g: 99, b: 235, alpha: 1 },
        })
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (1200x630)`);
    } else {
      await sharp(svg)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }
  }

  // Generate favicon.ico (multi-size ICO) - use 32x32 PNG as base
  // For simplicity, just copy the 32x32 as favicon.ico (browsers accept PNG in .ico)
  const favicon32 = await sharp(svg).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, "..", "public", "favicon.ico"), favicon32);
  console.log("✓ Generated favicon.ico (32x32)");

  console.log("\nAll icons generated successfully!");
  console.log("Logo for Google OAuth: public/logo-google-oauth.png (512x512)");
}

main().catch(console.error);
