/// <reference types="Cypress" />

context.skip('Distraction', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234')
  })

  it('track distraction', () => {
    cy.get('#track-distraction-button').click({force: true})
    cy.get('body').should('contain', 'Distraction tracked')
  })
})
