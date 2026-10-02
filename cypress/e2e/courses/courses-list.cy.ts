describe("Courses - List Page", () => {
  it("should load courses list page", () => {
    cy.visit("/fa/courses");

    cy.get("h1").should("be.visible");

    cy.get('[data-testid="course-card"]').should("have.length.greaterThan", 0);
  });

  it("should navigate to course detail when clicking a card", () => {
    cy.visit("/fa/courses");

    cy.get('[data-testid="course-card"]').first().find("a").first().click();

    cy.url().should("include", "/courses/");
  });

  it("should filter courses by search query", () => {
    cy.visit("/fa/courses");

    cy.get('[data-testid="course-search-input"]').type("React");

    cy.get('[data-testid="course-card"]').should("have.length.greaterThan", 0);
  });
});
