describe("Courses - Detail Page", () => {
  it("should display course details", () => {
    cy.visit("/fa/courses");
    cy.get('[data-testid="course-card"]').first().find("a").first().click();

    cy.get("h1").should("be.visible");

    cy.get('[data-testid="add-to-cart-btn"]').should("be.visible");
  });

  it("should have a clickable add to cart button", () => {
    cy.visit("/fa/courses");
    cy.get('[data-testid="course-card"]').first().find("a").first().click();

    cy.get('[data-testid="add-to-cart-btn"]').should("not.be.disabled");
  });
});
