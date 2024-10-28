// This e2e test file was written in Cypress

describe('TodoComponent.vue E2E Tests', () => {
  beforeEach(() => {
    // Visit the app containing TodoComponent
    cy.visit('/');
  });

  it('Displays the initial todos and shows "Remove all todos" option', () => {
    // Check that "Remove all todos" link is visible
    cy.contains('Remove all todos').should('be.visible');
    
    // Check that todos are initially loaded
    cy.get('table tbody tr').should('have.length.at.least', 1);
  });

  it('Adds a new todo item', () => {
    // Assuming the TableComponent has input fields for priority and title, simulate adding a todo
    cy.get('input[name="priority"]').type('1');
    cy.get('input[name="title"]').type('New Todo');
    cy.get('button').contains('Add').click();

    // Confirm success message appears
    cy.contains('Todo added successfully').should('be.visible');

    // Verify new item is in the table
    cy.get('table tbody').contains('New Todo');
  });

  it('Removes a todo item and displays confirmation', () => {
    // Add a todo item first
    cy.get('input[name="priority"]').type('2');
    cy.get('input[name="title"]').type('Todo to Delete');
    cy.get('button').contains('Add').click();

    // Remove the item
    cy.get('table tbody').contains('Todo to Delete').parent().find('.remove-button').click();

    // Confirm the deletion dialog
    cy.on('window:confirm', () => true);

    // Verify item is no longer in the list
    cy.get('table tbody').should('not.contain', 'Todo to Delete');
  });

  it('Displays error message if title is missing', () => {
    // Try adding a todo without title
    cy.get('input[name="priority"]').type('3');
    cy.get('button').contains('Add').click();

    // Verify error message
    cy.contains('Please add value for title').should('be.visible');
  });

  it('Clears all todos', () => {
    // Click on the "Remove all todos" link
    cy.contains('Remove all todos').click();

    // Confirm dialog for removing all todos
    cy.on('window:confirm', () => true);

    // Verify all todos are removed
    cy.get('table tbody tr').should('have.length', 0);
  });
});
