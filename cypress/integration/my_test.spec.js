describe("My First Test", () => {
  it("Visits the app and checks for a title", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Learn React");
  });
});
