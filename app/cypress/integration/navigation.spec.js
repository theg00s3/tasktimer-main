/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => cy.visit('http://localhost:1234'))

  it('hides welcome message after clicking on the close button', () => {
    cy.get('body').should('contain', 'Welcome to pomodoro.cc!')
    cy.get('#close-welcome-bar').click()
    cy.get('body').should('not.contain', 'Welcome to pomodoro.cc!')
  })
})
