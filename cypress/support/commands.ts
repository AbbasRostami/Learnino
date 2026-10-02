declare namespace Cypress {
  interface Chainable {
    login(email?: string, password?: string): Chainable<void>;
    addToGuestCart(courseId: string): Chainable<void>;
    clearGuestCart(): Chainable<void>;
  }
}

const env = (key: string): string => (Cypress as any).env(key);

Cypress.Commands.add("login", (email, password) => {
  const testEmail = email || env("testEmail");
  const testPassword = password || env("testPassword");

  cy.visit("/fa/login");

  cy.get('[data-testid="email-input"]').clear().type(testEmail);
  cy.get('[data-testid="password-input"]').clear().type(testPassword);
  cy.get('[data-testid="login-submit-btn"]').click();

  cy.url().should("not.include", "/login", { timeout: 40000 });
});

Cypress.Commands.add("addToGuestCart", (courseId) => {
  cy.window().then((win) => {
    const existingCart = JSON.parse(
      win.localStorage.getItem("learnino_guest_cart") || "[]",
    );

    const newItem = {
      id: courseId,
      courseId: courseId,
      title: "دوره تست",
      slug: "test-course",
      price: 500000,
      imageUrl: null,
      level: "BEGINNER",
      category: { id: "cat-1", name: "تست", slug: "test" },
      addedAt: new Date().toISOString(),
    };

    existingCart.push(newItem);
    win.localStorage.setItem(
      "learnino_guest_cart",
      JSON.stringify(existingCart),
    );
    win.dispatchEvent(new Event("cart-updated"));
  });
});

Cypress.Commands.add("clearGuestCart", () => {
  cy.window().then((win) => {
    win.localStorage.removeItem("learnino_guest_cart");
    win.dispatchEvent(new Event("cart-updated"));
  });
});
