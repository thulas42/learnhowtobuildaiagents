describe("Pricing Page", () => {
  beforeEach(() => {
    cy.visit("/pricing");
  });

  it("loads the pricing page", () => {
    cy.contains("Simple, Fair Pricing").should("be.visible");
  });

  it("displays 3 pricing plans", () => {
    cy.contains("Free").should("be.visible");
    cy.contains("Standard").should("be.visible");
    cy.contains("Premium").should("be.visible");
  });

  it("shows prices", () => {
    cy.contains("$0").should("be.visible");
    cy.contains("$49").should("be.visible");
    cy.contains("$149").should("be.visible");
  });

  it("highlights the most popular plan", () => {
    cy.contains("Most Popular").should("be.visible");
  });

  it("free plan redirects to signup", () => {
    cy.contains("Start Free").click();
    cy.url().should("include", "/auth/signup");
  });

  it("shows trust signals", () => {
    cy.contains("30-Day Guarantee").should("be.visible");
    cy.contains("Instant Access").should("be.visible");
  });

  it("shows FAQ section", () => {
    cy.contains("Frequently Asked Questions").should("be.visible");
    cy.contains("one-time payment").should("be.visible");
  });
});
