describe('pagination', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('goes to the last page', () => {
    const visitTextPageIfPossible = () => {
      cy.get('[data-cy="next"]').then(($next) => {
        if ($next.is('[disabled]')) {
          return
        }

        cy.wait(500)
        cy.get('[data-cy="next"]').click({ force: true })
        visitTextPageIfPossible()
      })
    }
    visitTextPageIfPossible()
  })
})
