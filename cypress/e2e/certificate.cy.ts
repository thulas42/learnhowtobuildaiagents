describe("Certificate", () => {
  it("loads the certificate preview page", () => {
    cy.visit("/certificate/preview");
    cy.contains("Certificate Preview").should("be.visible");
  });

  it("displays the certificate template and captures screenshot", () => {
    cy.visit("/certificate/preview");
    cy.contains("AI AGENT ACADEMY").should("be.visible");
    cy.contains("Jane Smith").should("be.visible");
    cy.contains("Certificate of Distinction").should("be.visible");
    cy.contains("AI Agent Development: From Zero to Production").should("be.visible");
    // Capture a screenshot of the full certificate page
    cy.screenshot("certificate-of-completion", { capture: "fullPage" });
  });

  it("shows skills on the certificate", () => {
    cy.visit("/certificate/preview");
    cy.contains("AI Architecture").should("be.visible");
    cy.contains("LLM Integration").should("be.visible");
    cy.contains("Python").should("be.visible");
  });

  it("has download and share buttons", () => {
    cy.visit("/certificate/preview");
    cy.contains("Download PDF").should("be.visible");
    cy.contains("Add to LinkedIn").should("be.visible");
    cy.contains("Share").should("be.visible");
  });

  it("shows industry recognition info", () => {
    cy.visit("/certificate/preview");
    cy.contains("Industry Recognition").should("be.visible");
    cy.contains("LinkedIn").should("be.visible");
    cy.contains("Credly").should("be.visible");
  });
});
