/// <reference types="cypress" />

export {};

const getEnv = (key: string): string => (Cypress as any).env(key);

describe("Authentication - Login Flow", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should login successfully with valid credentials", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="email-input"]').type(getEnv("testEmail"));
    cy.get('[data-testid="password-input"]').type(getEnv("testPassword"));
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.url().should("not.include", "/login");
    cy.get("body").should("be.visible");
  });

  it("should show error with wrong password", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="email-input"]').type(getEnv("testEmail"));
    cy.get('[data-testid="password-input"]').type("WrongPassword123");
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.url().should("include", "/login");
    cy.get('[data-invalid="true"]').should("be.visible");
  });

  it("should show error with non-existent email", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="email-input"]').type("nobody@nowhere.com");
    cy.get('[data-testid="password-input"]').type(getEnv("testPassword"));
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.url().should("include", "/login");
    cy.get('[data-invalid="true"]').should("be.visible");
  });

  it("should stay on login page and keep fields visible when form is empty", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="login-submit-btn"]').click();

    cy.url().should("include", "/login");
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
  });

  it("should login using custom command", () => {
    cy.login();

    cy.url().should("not.include", "/login");
  });

  it("should login using fixture data", () => {
    cy.fixture("user").then((user) => {
      cy.login(user.email);
    });

    cy.url().should("not.include", "/login");
  });
});
