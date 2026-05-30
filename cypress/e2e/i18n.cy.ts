describe("Internationalization", () => {
  it("loads in English by default", () => {
    cy.visit("/");
    cy.contains("Learn to Build AI Agents").should("be.visible");
  });

  it("loads Spanish version", () => {
    cy.visit("/es");
    cy.contains("Aprende a Crear Agentes de IA").should("be.visible");
  });

  it("loads French version", () => {
    cy.visit("/fr");
    cy.contains("Apprenez à Créer des Agents IA").should("be.visible");
  });

  it("loads Arabic version with RTL", () => {
    cy.visit("/ar");
    cy.get("html").should("have.attr", "dir", "rtl");
    cy.contains("تعلم بناء وكلاء الذكاء الاصطناعي").should("be.visible");
  });

  it("loads Chinese version", () => {
    cy.visit("/zh-CN");
    cy.contains("学习构建AI智能体").should("be.visible");
  });

  it("loads Japanese version", () => {
    cy.visit("/ja");
    cy.contains("AIエージェントの構築を学ぶ").should("be.visible");
  });

  it("language selector is visible", () => {
    cy.visit("/");
    cy.get("[aria-label='Language']").should("be.visible");
  });

  it("all 25 locales return 200", () => {
    const locales = ["en","es","fr","ar","zh-CN","hi","pt-BR","ru","ja","de","ko","tr","vi","it","th","id","pl","uk","nl","fa","ur","bn","ta","sw","he"];
    locales.forEach((locale) => {
      cy.request(`/${locale}`).its("status").should("eq", 200);
    });
  });
});
