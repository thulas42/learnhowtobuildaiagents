/**
 * Generate the Gumroad course access PDF.
 * This is the "product file" buyers receive after purchase.
 * Run: node scripts/generate-course-pdf.js
 */

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(__dirname, "..", "gumroad");
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const outputPath = path.join(OUTPUT_DIR, "AI-Agent-Academy-Course-Access.pdf");
const doc = new PDFDocument({ size: "A4", margin: 60 });
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// ── Colors ────────────────────────────────────────────────────────────────
const BLUE = "#2563eb";
const DARK = "#111827";
const GRAY = "#6b7280";
const LIGHT_GRAY = "#f3f4f6";
const GREEN = "#16a34a";

// ── Header ────────────────────────────────────────────────────────────────
doc.rect(0, 0, doc.page.width, 120).fill(BLUE);
doc.fillColor("white")
  .fontSize(28)
  .font("Helvetica-Bold")
  .text("AI Agent Academy", 60, 35);
doc.fontSize(14)
  .font("Helvetica")
  .text("Learn to Build AI Agents from Scratch", 60, 72);

// ── Welcome ───────────────────────────────────────────────────────────────
doc.moveDown(4);
doc.fillColor(DARK)
  .fontSize(22)
  .font("Helvetica-Bold")
  .text("Welcome to AI Agent Academy!", { align: "center" });

doc.moveDown(0.5);
doc.fillColor(GRAY)
  .fontSize(12)
  .font("Helvetica")
  .text(
    "Thank you for your purchase. You now have full access to the complete AI Agent Development course. " +
    "Follow the instructions below to access your course immediately.",
    { align: "center" }
  );

// ── Access Box ────────────────────────────────────────────────────────────
doc.moveDown(1.5);
const boxY = doc.y;
doc.rect(60, boxY, doc.page.width - 120, 100).fill(LIGHT_GRAY).stroke("#e5e7eb");

doc.fillColor(DARK)
  .fontSize(14)
  .font("Helvetica-Bold")
  .text("Your Course Access Link", 80, boxY + 18);

doc.fillColor(BLUE)
  .fontSize(16)
  .font("Helvetica-Bold")
  .text("https://learnhowtobuildaiagents.com", 80, boxY + 42, { link: "https://learnhowtobuildaiagents.com" });

doc.fillColor(GRAY)
  .fontSize(11)
  .font("Helvetica")
  .text("Click the link above or copy it into your browser", 80, boxY + 68);

// ── Getting Started ───────────────────────────────────────────────────────
doc.moveDown(5);
doc.fillColor(DARK)
  .fontSize(16)
  .font("Helvetica-Bold")
  .text("Getting Started (3 steps)");

doc.moveDown(0.5);
const steps = [
  ["1. Visit the course", "Go to https://learnhowtobuildaiagents.com"],
  ["2. Create your account", "Click 'Sign Up' — it's free and takes 30 seconds"],
  ["3. Start learning", "Module 1 is free. For full access, log in and go to Courses → Module 2"],
];

steps.forEach(([title, desc]) => {
  doc.moveDown(0.4);
  doc.fillColor(BLUE).fontSize(12).font("Helvetica-Bold").text(`  ${title}`);
  doc.fillColor(GRAY).fontSize(11).font("Helvetica").text(`  ${desc}`);
});

// ── Course Curriculum ─────────────────────────────────────────────────────
doc.moveDown(1.5);
doc.fillColor(DARK)
  .fontSize(16)
  .font("Helvetica-Bold")
  .text("Course Curriculum — 34 Lessons, 6 Modules");

doc.moveDown(0.5);

const modules = [
  { num: "Module 1", title: "Introduction to AI Agents", lessons: "4 lessons • FREE", color: "#3b82f6" },
  { num: "Module 2", title: "AI & Machine Learning Fundamentals", lessons: "5 lessons", color: "#8b5cf6" },
  { num: "Module 3", title: "Designing & Architecting Agents", lessons: "5 lessons", color: "#f59e0b" },
  { num: "Module 4", title: "Implementing AI Agents", lessons: "10 lessons (incl. Claude & MCP)", color: "#10b981" },
  { num: "Module 5", title: "Advanced Concepts", lessons: "6 lessons", color: "#ef4444" },
  { num: "Module 6", title: "Project-Based Learning", lessons: "4 lessons + Capstone", color: "#6366f1" },
];

modules.forEach((mod) => {
  doc.moveDown(0.3);
  doc.fillColor(mod.color).fontSize(11).font("Helvetica-Bold").text(`  ${mod.num}: ${mod.title}`);
  doc.fillColor(GRAY).fontSize(10).font("Helvetica").text(`  ${mod.lessons}`);
});

// ── Technologies ──────────────────────────────────────────────────────────
doc.moveDown(1.5);
doc.fillColor(DARK)
  .fontSize(16)
  .font("Helvetica-Bold")
  .text("Technologies You'll Master");

doc.moveDown(0.5);
const techs = [
  "Claude (Anthropic) + MCP (Model Context Protocol)",
  "LangChain — agent orchestration & chains",
  "LlamaIndex — RAG & document intelligence",
  "CrewAI — multi-agent systems",
  "OpenAI GPT-4 — LLM integration",
  "Python — the primary language throughout",
];

techs.forEach((tech) => {
  doc.fillColor(GRAY).fontSize(11).font("Helvetica").text(`  ✓  ${tech}`);
  doc.moveDown(0.2);
});

// ── Certificate ───────────────────────────────────────────────────────────
doc.moveDown(1);
doc.rect(60, doc.y, doc.page.width - 120, 70).fill("#f0fdf4").stroke("#bbf7d0");
const certY = doc.y - 70;
doc.fillColor(GREEN)
  .fontSize(13)
  .font("Helvetica-Bold")
  .text("🎓  Verifiable Certificate of Completion", 80, certY + 12);
doc.fillColor(GRAY)
  .fontSize(11)
  .font("Helvetica")
  .text(
    "Complete all modules and pass the final exam to earn your certificate. " +
    "Shareable on LinkedIn with a unique QR verification code.",
    80, certY + 34
  );

// ── Support ───────────────────────────────────────────────────────────────
doc.moveDown(4);
doc.fillColor(DARK)
  .fontSize(14)
  .font("Helvetica-Bold")
  .text("Need Help?");
doc.fillColor(GRAY)
  .fontSize(11)
  .font("Helvetica")
  .text("Email: support@learnhowtobuildaiagents.com");
doc.text("Website: https://learnhowtobuildaiagents.com");

// ── Footer ────────────────────────────────────────────────────────────────
doc.rect(0, doc.page.height - 50, doc.page.width, 50).fill(BLUE);
doc.fillColor("white")
  .fontSize(10)
  .font("Helvetica")
  .text(
    "© 2026 AI Agent Academy  •  https://learnhowtobuildaiagents.com  •  All rights reserved",
    0, doc.page.height - 32,
    { align: "center" }
  );

doc.end();

stream.on("finish", () => {
  console.log(`✓ PDF generated: ${outputPath}`);
  console.log("  Upload this file to Gumroad as your product content.");
});
