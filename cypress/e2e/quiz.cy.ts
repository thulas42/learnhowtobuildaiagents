describe("Quiz System", () => {
  beforeEach(() => {
    cy.visit("/courses/module-1/lesson-1.1");
    cy.contains("Quiz").click();
  });

  it("displays a quiz with questions", () => {
    cy.contains("Question 1 of 5").should("be.visible");
  });

  it("shows 4 answer options", () => {
    cy.get("button").filter(":contains('A'), :contains('B'), :contains('C'), :contains('D')").should("have.length.at.least", 4);
  });

  it("requires selecting an answer before submitting", () => {
    cy.contains("Submit").should("be.disabled");
  });

  it("allows selecting an answer", () => {
    cy.get("[class*='rounded-lg border-2']").first().click();
    cy.contains("Submit").should("not.be.disabled");
  });

  it("shows feedback after submitting", () => {
    cy.get("[class*='rounded-lg border-2']").first().click();
    cy.contains("Submit").click();
    cy.get("[class*='rounded-lg']").then(($el) => {
      const text = $el.text();
      expect(text.includes("Correct") || text.includes("Incorrect")).to.be.true;
    });
  });

  it("advances to next question", () => {
    cy.get("[class*='rounded-lg border-2']").first().click();
    cy.contains("Submit").click();
    cy.contains("Next").click();
    cy.contains("Question 2 of 5").should("be.visible");
  });

  it("shows results after completing all questions", () => {
    for (let i = 0; i < 5; i++) {
      cy.get("[class*='rounded-lg border-2']").first().click();
      cy.contains("Submit").click();
      if (i < 4) {
        cy.contains("Next").click();
      } else {
        cy.contains("Finish").click();
      }
    }
    cy.contains("Quiz Result").should("be.visible");
    cy.contains("%").should("be.visible");
  });

  it("shows randomized indicator", () => {
    cy.contains("Randomized").should("be.visible");
  });
});
