/// <reference types="cypress" />

Cypress.Commands.add("loginByApi", (email: string, password: string) => {
  cy.request("GET", "/api/auth/csrf").then((csrfRes) => {
    const csrfToken = csrfRes.body.csrfToken;
    cy.request({
      method: "POST",
      url: "/api/auth/callback/credentials",
      form: true,
      body: {
        csrfToken,
        email,
        password,
        callbackUrl: "/",
        json: true,
      },
    });
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(email: string, password: string): Chainable<void>;
    }
  }
}

export {};
