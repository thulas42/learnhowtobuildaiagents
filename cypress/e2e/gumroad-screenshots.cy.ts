/**
 * Gumroad Marketing Screenshots
 * Captures high-quality screenshots of key pages for Gumroad product listing.
 * Run: npx cypress run --spec "cypress/e2e/gumroad-screenshots.cy.ts"
 * Output: cypress/screenshots/gumroad-screenshots.cy.ts/
 */

describe("Gumroad Marketing Screenshots", () => {
  // Use a wide viewport for cover images
  beforeEach(() => {
    cy.viewport(1280, 800);
  });

  // Helper to dismiss Next.js dev overlay if present
  function dismissDevOverlay() {
    // Hide Next.js dev error overlay and toolbar
    cy.document().then((doc) => {
      const style = doc.createElement("style");
      style.innerHTML = `
        nextjs-portal,
        [data-nextjs-dialog-overlay],
        [data-nextjs-toast],
        #__next-build-watcher,
        #__nextjs__container__errors__toasts,
        nextjs-portal::part(container) { display: none !important; }
      `;
      doc.head.appendChild(style);
    });
  }

  it("01 - Landing page hero (cover image)", () => {
    cy.visit("/");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("01-landing-hero", { capture: "viewport" });
  });

  it("02 - Landing page full (full page)", () => {
    cy.visit("/");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("02-landing-full", { capture: "fullPage" });
  });

  it("03 - Tech stack section", () => {
    cy.visit("/");
    cy.wait(2000);
    dismissDevOverlay();
    cy.scrollTo(0, 700);
    cy.wait(500);
    cy.screenshot("03-tech-stack", { capture: "viewport" });
  });

  it("04 - Modules section", () => {
    cy.visit("/#modules");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("04-modules-section", { capture: "viewport" });
  });

  it("05 - Courses listing page", () => {
    cy.visit("/courses");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("05-courses-listing", { capture: "fullPage" });
  });

  it("06 - Free lesson 1.1 content", () => {
    cy.visit("/courses/module-1/lesson-1.1");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("06-lesson-content", { capture: "viewport" });
  });

  it("07 - Free lesson 1.1 full page", () => {
    cy.visit("/courses/module-1/lesson-1.1");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("07-lesson-full", { capture: "fullPage" });
  });

  it("08 - Quiz interface", () => {
    cy.visit("/courses/module-1/lesson-1.1");
    cy.wait(2000);
    dismissDevOverlay();
    cy.contains("Quiz").click();
    cy.wait(1000);
    dismissDevOverlay();
    cy.screenshot("08-quiz-interface", { capture: "viewport" });
  });

  it("09 - Pricing page", () => {
    cy.visit("/pricing");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("09-pricing", { capture: "fullPage" });
  });

  it("10 - Certificate preview", () => {
    cy.visit("/certificate/preview");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("10-certificate", { capture: "fullPage" });
  });

  it("11 - Blog page", () => {
    cy.visit("/blog");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("11-blog", { capture: "fullPage" });
  });

  it("12 - Mobile hero (thumbnail size)", () => {
    cy.viewport(390, 844);
    cy.visit("/");
    cy.wait(2000);
    dismissDevOverlay();
    cy.wait(500);
    cy.screenshot("12-mobile-hero", { capture: "viewport" });
  });
});
