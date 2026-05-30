describe("Courses", () => {
  describe("Course Listing", () => {
    beforeEach(() => {
      cy.visit("/courses");
    });

    it("displays all 6 modules", () => {
      cy.contains("Course Modules").should("be.visible");
      cy.contains("Introduction to AI Agents").should("be.visible");
      cy.contains("Project-Based Learning").should("be.visible");
    });

    it("shows lesson count per module", () => {
      cy.contains("4 lessons").should("exist");
    });

    it("shows progress bars", () => {
      cy.get(".progress-bar").should("have.length.at.least", 1);
    });

    it("navigates to a lesson when clicked", () => {
      cy.contains("What is an AI Agent?").click();
      cy.url().should("include", "/courses/module-1/lesson-1.1");
    });
  });

  describe("Lesson Page", () => {
    beforeEach(() => {
      cy.visit("/courses/module-1/lesson-1.1");
    });

    it("displays lesson content", () => {
      cy.contains("What is an AI Agent?").should("be.visible");
      cy.contains("Lesson 1.1").should("be.visible");
    });

    it("has lesson and quiz tabs", () => {
      cy.contains("Lesson").should("be.visible");
      cy.contains("Quiz").should("be.visible");
    });

    it("shows lesson content by default", () => {
      cy.contains("Agent-Environment Interaction Loop").should("be.visible");
    });

    it("switches to quiz tab", () => {
      cy.contains("Quiz").click();
      cy.contains("Question").should("be.visible");
    });

    it("has navigation to next lesson", () => {
      cy.contains("Types of AI Agents").should("be.visible");
    });

    it("navigates to next lesson", () => {
      cy.contains("Types of AI Agents").click();
      cy.url().should("include", "/lesson-1.2");
    });
  });

  describe("All Lessons Accessible", () => {
    const lessons = [
      "/courses/module-1/lesson-1.1",
      "/courses/module-1/lesson-1.4",
      "/courses/module-2/lesson-2.3",
      "/courses/module-3/lesson-3.1",
      "/courses/module-4/lesson-4.1",
      "/courses/module-5/lesson-5.1",
      "/courses/module-6/lesson-6.1",
    ];

    lessons.forEach((url) => {
      it(`loads ${url}`, () => {
        cy.visit(url);
        cy.get("h1").should("be.visible");
        cy.contains("Coming Soon").should("not.exist");
      });
    });
  });
});
