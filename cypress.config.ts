import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    responseTimeout: 30000,
    retries: {
      runMode: 2,
      openMode: 0,
    },

    env: {
      testEmail: "test@learnino.com",
      testPassword: "Test@123456",
    },
  },
});
