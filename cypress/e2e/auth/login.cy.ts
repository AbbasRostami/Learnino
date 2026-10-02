/// <reference types="cypress" />

export {};

const getEnv = (key: string): string => (Cypress as any).env(key);

describe("Authentication - Login Flow", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // ✅ تست ۱: لاگین موفق
  it("should login successfully with valid credentials", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="email-input"]').type(getEnv("testEmail"));
    cy.get('[data-testid="password-input"]').type(getEnv("testPassword"));
    cy.get('[data-testid="login-submit-btn"]').click();

    // ✅ Multiple assertions (Best Practice: No Tiny Tests)
    cy.url().should("not.include", "/login");
    cy.get("body").should("be.visible");
  });

  // ✅ تست ۲: رمز اشتباه (با data-testid بجای cy.contains)
  it("should show error with wrong password", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="email-input"]').type(getEnv("testEmail"));
    cy.get('[data-testid="password-input"]').type("WrongPassword123");
    cy.get('[data-testid="login-submit-btn"]').click();

    // ✅ Best Practice: data-* بجای text content
    cy.url().should("include", "/login");
    cy.get('[data-invalid="true"]').should("be.visible");
  });

  // ✅ تست ۳: ایمیل ناموجود
  it("should show error with non-existent email", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="email-input"]').type("nobody@nowhere.com");
    cy.get('[data-testid="password-input"]').type(getEnv("testPassword"));
    cy.get('[data-testid="login-submit-btn"]').click();

    cy.url().should("include", "/login");
    cy.get('[data-invalid="true"]').should("be.visible");
  });

  // ✅ تست ۴: فرم خالی (با multiple assertions)
  it("should stay on login page and keep fields visible when form is empty", () => {
    cy.visit("/fa/login");

    cy.get('[data-testid="login-submit-btn"]').click();

    cy.url().should("include", "/login");
    cy.get('[data-testid="email-input"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
  });

  // ✅ تست ۵: استفاده از Custom Command
  it("should login using custom command", () => {
    cy.login();

    cy.url().should("not.include", "/login");
  });

  // ✅ تست ۶: استفاده از اطلاعات Fixture
  it("should login using fixture data", () => {
    cy.fixture("user").then((user) => {
      cy.login(user.email);
    });

    cy.url().should("not.include", "/login");
  });
});
