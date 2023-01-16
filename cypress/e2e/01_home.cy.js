describe('home page', () => {
  it('visit home page', () => {
    cy.visit('/')
    cy.contains('[data-cy="table header"]', 'MovieDB').should('be.visible')
  })
})
