/// <reference types="cypress" />

describe("Task Scheduler Application", () => {
  beforeEach(() => {
    cy.visit("index.html"); // Adjust this if your HTML file is in a different location
  });

  it("should load the page correctly", () => {
    cy.contains("Task Scheduler");
    cy.get("input#task").should("be.visible");
    cy.get("select#priority").should("be.visible");
    cy.get("input#deadline").should("be.visible");
    cy.get("button#add-task").should("be.visible");
  });

  it("should add a task correctly", () => {
    cy.get("input#task").type("New Task");
    cy.get("select#priority").select("middle");
    cy.get("input#deadline").type("2024-12-31");
    cy.get("button#add-task").click();

    cy.get(".task").should("have.length", 1);
    cy.contains("New Task");
    cy.contains("Priority: middle");
    cy.contains("Deadline: 2024-12-31");
  });

  it("should not add a task with an empty task input", () => {
    cy.get("input#task").clear();
    cy.get("select#priority").select("middle");
    cy.get("input#deadline").type("2024-12-31");
    cy.get("button#add-task").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please select an upcoming date for the deadline.");
    });

    cy.get(".task").should("have.length", 0);
  });

  it("should not add a task with an empty deadline input", () => {
    cy.get("input#task").type("New Task");
    cy.get("select#priority").select("middle");
    cy.get("input#deadline").clear();
    cy.get("button#add-task").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please select an upcoming date for the deadline.");
    });

    cy.get(".task").should("have.length", 0);
  });

  it("should not add a task with a past deadline", () => {
    cy.get("input#task").type("New Task");
    cy.get("select#priority").select("middle");
    cy.get("input#deadline").type("2023-01-01");
    cy.get("button#add-task").click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("Please select an upcoming date for the deadline.");
    });

    cy.get(".task").should("have.length", 0);
  });

  it("should mark a task as done", () => {
    cy.get("input#task").type("New Task");
    cy.get("select#priority").select("middle");
    cy.get("input#deadline").type("2024-12-31");
    cy.get("button#add-task").click();

    cy.get(".task button.mark-done").click();
    cy.get(".task").should(
      "have.css",
      "background-color",
      "rgb(242, 242, 242)"
    );
    cy.get(".task button.mark-done").should("be.disabled");
  });
});
