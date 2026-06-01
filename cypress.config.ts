import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    video: false,
    screenshotOnRunFailure: true,
    excludeSpecPattern: ["**/gumroad-screenshots.cy.ts"],
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
