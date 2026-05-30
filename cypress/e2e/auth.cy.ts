describe("Authentication", () => {
  describe("Signup", () => {
    beforeEach(() => {
      cy.visit("/auth/signup");
    });

    it("loads the signup page", () => {
      cy.contains("Create Your Account").should("be.visible");
    });

    it("shows validation for mismatched passwords", () => {
      cy.get("#name").type("Test User");
      cy.get("#email").type("test@cypress.io");
      cy.get("#password").type("password123");
      cy.get("#confirmPassword").type("different123");
      cy.get("form").submit();
      cy.contains("Passwords do not match").should("be.visible");
    });

    it("creates an account successfully", () => {
      const email = `cypress-${Date.now()}@test.com`;
      cy.get("#name").type("Cypress User");
      cy.get("#email").type(email);
      cy.get("#password").type("testpass123");
      cy.get("#confirmPassword").type("testpass123");
      cy.get("form").submit();
      cy.contains("Account created").should("be.visible");
    });

    it("shows error for duplicate email", () => {
      cy.get("#name").type("Test User");
      cy.get("#email").type("test@example.com");
      cy.get("#password").type("password123");
      cy.get("#confirmPassword").type("password123");
      cy.get("form").submit();
      cy.contains("already exists").should("be.visible");
    });

    it("has Google and GitHub OAuth buttons", () => {
      cy.contains("Google").should("be.visible");
      cy.contains("GitHub").should("be.visible");
    });
  });

  describe("Login", () => {
    beforeEach(() => {
      cy.visit("/auth/login");
    });

    it("loads the login page", () => {
      cy.contains("Welcome Back").should("be.visible");
    });

    it("shows error for invalid credentials", () => {
      cy.get("#email").type("wrong@email.com");
      cy.get("#password").type("wrongpassword");
      cy.get("form").submit();
      cy.contains("Invalid email or password").should("be.visible");
    });

    it("has link to signup page", () => {
      cy.contains("Sign up").click();
      cy.url().should("include", "/auth/signup");
    });
  });
});
