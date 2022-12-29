describe('filters', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('allows to filter by title/director/starring', () => {
    cy.get('[data-cy="global filter input"]').type('Lord').submit()
    cy.contains('[data-cy="table"]', 'Lord').should('be.visible')
    cy.get('[data-cy="table"]').wait(2000)
  })

  it('allows to filter by rating', () => {
    cy.get('[data-cy="select"]').select('10')
    cy.get('[data-cy="table"]').wait(2000)
  })

  it('allows to filter by year', () => {
    cy.get('[data-cy="min"]').type('1990')
    cy.get('[data-cy="max"]').type('2005')
    cy.get('[data-cy="table"]').wait(2000)
  })

  it('allows all filters', () => {
    cy.get('[data-cy="global filter input"]').type('Lord').submit()
    cy.get('[data-cy="select"]').select('8-9')
    cy.get('[data-cy="min"]').type('1990')
    cy.get('[data-cy="max"]').type('2022')
  })
})
