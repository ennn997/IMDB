describe('add new movie page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-cy="add button"]').click()
    cy.url().should('eq', 'http://localhost:3000/newMovie')
  })

  context('cancel adding new movie', () => {
    it(' allows to cancel adding new movie', () => {
      cy.get('[data-cy="title input"]').type('La La Land')
      cy.get('[data-cy="rating input"]').type('8')
      cy.get('[data-cy="year input"]').type('2016')
      cy.get('[data-cy="director input"]').type('Damien Chazelle')
      cy.get('[data-cy="starring input"]').type('Ryan Gosling')
      cy.get('[data-cy="cancel button"]').click()
    })
  })

  context('test validation form', () => {
    it('allows test validation form', () => {
      cy.get('[data-cy="submit button"]').click()
      cy.get('[data-cy="title error msg"]').should('be.visible').and('contain', 'Please add Movie title')
      cy.get('[data-cy="rating error msg"]').should('be.visible').and('contain', 'Please rate a movie from 0-10!')
      cy.get('[data-cy="year error msg"]')
        .should('be.visible')
        .and('contain', 'Please add a year when movie is released!')
      cy.get('[data-cy="director error msg"]').should('be.visible').and('contain', 'Please add name of director')
      cy.get('[data-cy="starring error msg"]').should('be.visible').and('contain', 'Please add name of starring actor!')
    })
  })

  context('add new movie', () => {
    it(' allows adding new movie', () => {
      cy.get('[data-cy="title input"]').type('La La Land')
      cy.get('[data-cy="rating input"]').type('8')
      cy.get('[data-cy="year input"]').type('2016')
      cy.get('[data-cy="director input"]').type('Damien Chazelle')
      cy.get('[data-cy="starring input"]').type('Ryan Gosling')
      cy.get('[data-cy="submit button"]').click()
    })
  })
})
