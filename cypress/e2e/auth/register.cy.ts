describe("Authentication - Register Flow", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("should register a new user and verify OTP", () => {
    cy.intercept("POST", "**/api/auth/verify-email", {
      statusCode: 200,
      body: {
        status: "success",
        data: { message: "ایمیل با موفقیت تایید شد" },
      },
    }).as("verifyOtpRequest");

    cy.visit("/fa/register");

    cy.get('[data-testid="name-input"]').type("کاربر جدید");

    const uniqueEmail = `test${Date.now()}@learnino.com`;
    cy.get('[data-testid="email-input"]').type(uniqueEmail);

    cy.get('[data-testid="password-input"]').type(env("testPassword"));

    cy.get('[data-testid="register-submit-btn"]').click();

    cy.get('[data-testid="otp-input"]').should("be.visible");
    cy.get('[data-testid="otp-input"]').type("000000");

    cy.wait("@verifyOtpRequest");

    cy.url().should("not.include", "/verify-email");
  });

  it("should show error and not advance to OTP when email already exists", () => {
    cy.visit("/fa/register");

    cy.get('[data-testid="name-input"]').type("کاربر تکراری");

    cy.get('[data-testid="email-input"]').type(env("testEmail"));
    cy.get('[data-testid="password-input"]').type(env("testPassword"));
    cy.get('[data-testid="register-submit-btn"]').click();

    cy.url().should("include", "/register");
    cy.get('[data-testid="register-submit-btn"]').should("be.visible");
    cy.get('[data-testid="otp-input"]').should("not.exist");
  });

  it("should show validation error for short password and stay on register page", () => {
    cy.visit("/fa/register");

    cy.get('[data-testid="name-input"]').type("کاربر تست");
    cy.get('[data-testid="email-input"]').type("short@test.com");

    cy.get('[data-testid="password-input"]').type("123");
    cy.get('[data-testid="register-submit-btn"]').click();

    cy.url().should("include", "/register");
    cy.get('[data-invalid="true"]').should("be.visible");
  });
});
