describe("Cart - Add to Cart Flow", () => {
  beforeEach(() => {
    cy.clearGuestCart();
  });

  it("should add course to guest cart", () => {
    cy.visit("/fa/courses");

    cy.get('[data-testid="course-card"]').first().find("a").first().click();

    cy.url().should("include", "/courses/");

    cy.get('[data-testid="add-to-cart-btn"]').should("be.visible").click();

    cy.get('[data-testid="nav-cart-count"]').should("be.visible");
    cy.get('[data-testid="nav-cart-count"]').should("contain", "1");
  });

  it("should navigate to cart page and see items", () => {
    cy.addToGuestCart("test-course-id-123");

    cy.visit("/fa/cart");

    cy.get('[data-testid="cart-item-card"]').should("have.length", 1);
  });

  it("should remove item from cart", () => {
    cy.addToGuestCart("test-course-id-123");
    cy.visit("/fa/cart");

    cy.get('[data-testid="cart-item-card"]').should("have.length", 1);

    cy.get('[data-testid="remove-item-btn"]').click();

    cy.get('[data-testid="cart-item-card"]').should("have.length", 0);
  });
});
