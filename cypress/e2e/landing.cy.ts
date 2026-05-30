describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the homepage", () => {
    cy.get("h1").should("be.visible");
    cy.contains("AI Agent").should("exist");
  });

  it("displays all 6 course modules", () => {
    cy.get("#modules").scrollIntoView();
    cy.contains("Introduction to AI Agents").should("be.visible");
    cy.contains("AI & Machine Learning Fundamentals").should("be.visible");
    cy.contains("Designing & Architecting Agents").should("be.visible");
    cy.contains("Implementing AI Agents").should("be.visible");
    cy.contains("Advanced Concepts").should("be.visible");
    cy.contains("Project-Based Learning").should("be.visible");
  });

  it("shows pricing section with 3 plans", () => {
    cy.contains("Accessible to Everyone").scrollIntoView();
    cy.contains("Free").should("be.visible");
    cy.contains("Standard").should("be.visible");
    cy.contains("Premium").should("be.visible");
  });

  it("has working navigation links", () => {
    cy.contains("Courses").click();
    cy.url().should("include", "/courses");
  });

  it("has a language selector", () => {
    cy.get("[aria-label='Language']").should("exist");
  });
});
