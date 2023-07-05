describe("Tasks", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should add new task", () => {
    cy.get(".add-task > input").type("Sleep");
    cy.get(".add-task > button").click();

    cy.get("tbody > :nth-child(2) > :nth-child(1)").should("contain", "Sleep");

    cy.get(".add-task > input").should("be.empty");
  });

  it("should set Date and Time Completed on checking the status", () => {
    cy.get(".add-task > input").type("Sleep");
    cy.get(".add-task > button").click();

    cy.get(":nth-child(2) > :nth-child(2) > input").check();

    cy.get("tbody > :nth-child(2) > :nth-child(3)").should("not.be.empty");
  });

  it.only("should delete task", () => {
    cy.get(":nth-child(1) > :nth-child(4) > button").click();

    cy.get(":nth-child(2) > :nth-child(2) > input").should("not.exist");
  });
});
