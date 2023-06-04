describe("Constructor is ok", () => {

  const burgerIngredients = '[data-test="burger-ingredient"]';

  beforeEach(() => {
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "ingredients",
    });

    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    window.localStorage.setItem(
        "refreshToken",
        JSON.stringify("test-refreshToken")
      );
      cy.setCookie('accessToken', 'test-accessToken')
    

    cy.visit("http://localhost:3000");
  });



  it("Drag bun is ok", () => {
    cy.get(burgerIngredients).contains("булка").trigger("dragstart");
    cy.get('[data-test="drop-target"]').trigger("drop");
    cy.get('[data-test="top-bun"]').should("exist");
    cy.get('[data-test="bottom-bun"]').should("exist");
  });

  it("Drag main ingredient is ok", () => {
    cy.get(burgerIngredients).contains("Биокотлета").trigger("dragstart");
    cy.get('[data-test="drop-target"]').trigger("drop");
    cy.get('[data-test="main"]').should("exist");
  });

  it("Show&Hide modal with ingredient is ok", () => {
    cy.get(burgerIngredients).contains("Биокотлета").click();
    cy.contains("Детали ингредиента");
    cy.contains("Биокотлета");
    cy.get('[data-test="close"]').click();
    cy.contains("Соберите бургер");
  });

  it("Show&Hide modal with order is ok", () => {
    cy.get(burgerIngredients).contains("булка").trigger("dragstart");
    cy.get('[data-test="drop-target"]').trigger("drop");
    cy.get(burgerIngredients).contains("Биокотлета").trigger("dragstart");
    cy.get('[data-test="drop-target"]').trigger("drop");
    cy.get('[data-test="make-order"]').click();
    cy.get('[data-test="order-number"]').contains("123").should("exist");
    cy.get('[data-test="close"]').click();
    cy.contains("Соберите бургер");
  });
});
