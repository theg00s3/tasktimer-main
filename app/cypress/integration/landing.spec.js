/// <reference types="Cypress" />

context('Landing', () => {
  beforeEach(() => cy.visit('http://localhost:1234'))
  it('shows timer with 00:00', () =>
    cy.get('body').should('contain', '00:00'))

  it('shows buttons to start 25, 15 and 5 minute timer', () => {
    cy.get('.timer-buttons-container').should('contain', '25min')
    cy.get('.timer-buttons-container').should('contain', '15min')
    cy.get('.timer-buttons-container').should('contain', '5min')
  })

  it.skip('shows button for tracking distractions', () =>
    cy.get('.track-distraction-button').should('contain', 'distract'))

  it('shows example todolist', () => {
    cy.get('.todo-form-container').should('contain', 'Todo')
    cy.get('.todo-form-container').should('contain', 'Done')

    cy.get('.todo-form').eq(0).should('contain', 'start a 25 minutes timer and get focused')
    cy.get('.todo-form').eq(0).should('contain', 'take a break, start a 5 minute timer!')

    cy.get('.todo-form').eq(1).should('contain', 'visit pomodoro.cc')
  })
})
