/// <reference types="Cypress" />

context('Timer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234')
    // cy.wait(500)
  })

  it('start/stop timer for 25min', () => {
    cy.get('#minutes-25').click()
    cy.get('#timer').contains(/24:5\d/)
    cy.get('#minutes-25').click()
    cy.get('#timer').contains('00:00')
  })

  it('start/stop timer for 15min', () => {
    cy.get('#minutes-15').click()
    cy.get('#timer').contains(/14:5\d/)
    cy.get('#minutes-15').click()
    cy.get('#timer').contains('00:00')
  })

  it('start/stop timer for 5min', () => {
    cy.get('#minutes-5').click()
    cy.get('#timer').contains(/04:5\d/)
    cy.get('#minutes-5').click()
    cy.get('#timer').contains('00:00')
  })
})
