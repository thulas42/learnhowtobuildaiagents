describe("Quiz System", () => {
  beforeEach(() => {
    cy.visit("/courses/module-1/lesson-1.1");
    cy.contains("Quiz").click();
    cy.get("[data-testid=quiz-player]", { timeout: 15000 }).should("be.visible");
  });

  it("displays a quiz with questions", () => {
    cy.contains("Question 1 of 5").should("be.visible");
  });

  it("shows answer options", () => {
    cy.get("[data-testid^=quiz-option-]").should("have.length.at.least", 2);
  });

  it("requires selecting an answer before submitting", () => {
    cy.get("[data-testid=quiz-submit]").should("be.disabled");
  });

  it("allows selecting an answer", () => {
    cy.get("[data-testid^=quiz-option-]").first().click();
    cy.get("[data-testid=quiz-submit]").should("not.be.disabled");
  });

  it("shows feedback after submitting", () => {
    cy.get("[data-testid^=quiz-option-]").first().click();
    cy.get("[data-testid=quiz-submit]").click();
    cy.contains(/Correct|Incorrect/i).should("be.visible");
  });

  it("advances to next question", () => {
    cy.get("[data-testid^=quiz-option-]").first().click();
    cy.get("[data-testid=quiz-submit]").click();
    cy.get("[data-testid=quiz-next]").click();
    cy.contains("Question 2 of 5").should("be.visible");
  });

  it("shows results after completing all questions", () => {
    for (let i = 0; i < 5; i++) {
      cy.get("[data-testid^=quiz-option-]").first().click();
      cy.get("[data-testid=quiz-submit]").click();
      if (i < 4) {
        cy.get("[data-testid=quiz-next]").click();
      } else {
        cy.get("[data-testid=quiz-next]").click();
      }
    }
    cy.contains("Quiz Result").should("be.visible");
    cy.contains("%").should("be.visible");
  });

  it("shows randomized indicator", () => {
    cy.contains("Randomized").should("be.visible");
  });
});
