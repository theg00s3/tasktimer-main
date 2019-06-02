/// <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => cy.visit('http://localhost:1234'))

  it.skip('shows open stats', () => {
    cy.get('#open-stats').click()
    cy.get('body').should('contain', 'Open stats of pomodoro.cc')
    cy.get('iframe')
  })
})
