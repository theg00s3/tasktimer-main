/// <reference types="Cypress" />

context('Timer', () => {
  beforeEach(() => cy.visit('http://localhost:1234'))

  it('start/stop timer for 25min', () => {
    cy.get('#minutes-25').click()
    cy.get('#timer').contains(/24:5\d/)
    cy.get('#minutes-25').click()
    cy.get('#timer').contains('00:00')
  })
})
