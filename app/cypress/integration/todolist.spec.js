/// <reference types="Cypress" />

context.skip('Todolist', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234')
  })

  it('add a todo', () => {
    cy.get('#todo-input').type('Write UAT with Cypress{enter}', {delay: 60})
    cy.get('#todo-input').should('be.empty')
    cy.get('.todo-form:first').should('contain', 'Write UAT with Cypress')
  })

  it('edit a todo', () => {
    cy.scrollTo('bottom')
    cy.get('.todo-form:first').find('.todo label.text:first').dblclick()
    cy.get('.todo-form .edit-view')
  })

  it('complete a todo', () => {
    cy.scrollTo('bottom')
    cy.get('.todo-form:first').find('.edit:first').click({force: true})
  })
})
