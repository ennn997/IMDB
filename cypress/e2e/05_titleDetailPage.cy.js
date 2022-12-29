describe('title detail page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('navigate to specific title detail page', () => {
    cy.get('tbody.css-0 > :nth-child(3) > :nth-child(1)').click()
    cy.url().should('eq', 'http://localhost:3000/titleDetailPage?title=The+Lord+of+War')
    cy.get('[data-cy="back button"]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
