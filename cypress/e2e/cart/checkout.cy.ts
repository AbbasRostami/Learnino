describe("Cart - Checkout Flow", () => {
  it("should complete payment with wallet balance", () => {
    cy.login();

    cy.visit("/fa/cart");

    cy.get('[data-testid="wallet-pay-btn"]').click();
    cy.get("body").should("contain", "موجودی");

    cy.get('[data-testid="checkout-btn"]').click();

    cy.url().should("include", "/payment/success");
    cy.get("body").should("be.visible");
  });

  it("should show ZarinPal payment option and allow selection", () => {
    cy.login();
    cy.visit("/fa/cart");

    cy.get('[data-testid="zarinpal-pay-btn"]').should("be.visible");
    cy.get('[data-testid="zarinpal-pay-btn"]').click();
    cy.get('[data-testid="zarinpal-pay-btn"]').should(
      "have.attr",
      "aria-pressed",
      "true",
    );
  });

  it("should redirect to login when unauthenticated user tries to checkout", () => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.addToGuestCart("test-course-id");
    cy.visit("/fa/cart");

    cy.get('[data-testid="checkout-btn"]').click();

    cy.url().should("include", "/login");
    cy.get('[data-testid="email-input"]').should("be.visible");
  });
});
