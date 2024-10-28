// <reference types="cypress" />

describe("To-do List Component", () => {
    beforeEach(() => {
      // Visit the page where the Vue component is rendered
      cy.visit("/");
    });
  
    it("should add a new to-do item", () => {
      cy.get("#priority").select("critical"); // Select priority
      cy.get("input[placeholder='Enter a new task']").type("Test Task"); // Enter a new task
      cy.contains("Add new").click(); // Click on "Add new" button
  
      // Check that the new item is added in the list
      cy.get("tbody tr").last().within(() => {
        cy.contains("critical");
        cy.contains("Test Task");
      });
    });
  
    it("should show a message if title is empty when adding a new to-do", () => {
      cy.contains("Add new").click();
      cy.get(".msg").should("contain.text", "Please add value for title");
    });
  
    it("should update an existing to-do item", () => {
      // Add a new item for testing update functionality
      cy.get("#priority").select("moderate");
      cy.get("input[placeholder='Enter a new task']").type("Task to Update");
      cy.contains("Add new").click();
  
      // Click "Edit" button and update the task title
      cy.get("tbody tr").last().within(() => {
        cy.contains("Edit").click();
      });
      cy.get("input[placeholder='Enter a new task']").clear().type("Updated Task");
      cy.contains("Add new").click();
  
      // Verify the task has been updated
      cy.get("tbody tr").last().within(() => {
        cy.contains("Updated Task");
      });
    });
  
    it("should delete a to-do item", () => {
      // Add a new item for testing delete functionality
      cy.get("#priority").select("optional");
      cy.get("input[placeholder='Enter a new task']").type("Task to Delete");
      cy.contains("Add new").click();
  
      // Delete the newly added item
      cy.get("tbody tr").last().within(() => {
        cy.contains("Remove").click();
      });
      cy.on("window:confirm", () => true); // Confirm the delete action
  
      // Verify that the item is no longer in the list
      cy.get("tbody tr").should("not.contain", "Task to Delete");
    });
  
    it("should remove all to-do items", () => {
      // Ensure there are some items to delete
      cy.get("#priority").select("moderate");
      cy.get("input[placeholder='Enter a new task']").type("Task 1");
      cy.contains("Add new").click();
  
      cy.get("#priority").select("critical");
      cy.get("input[placeholder='Enter a new task']").type("Task 2");
      cy.contains("Add new").click();
  
      // Remove all items
      cy.contains("Remove all todos").click();
      cy.on("window:confirm", () => true); // Confirm the remove all action
  
      // Verify that no items are left
      cy.get("tbody tr").should("have.length", 1); // Only the input row should remain
    });
  });
  