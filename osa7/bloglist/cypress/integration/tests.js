describe('Bloglist tests', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/test/reset')

    const user = {
      name: 'Mika Laaksonen',
      username: 'mlaaksonen',
      password: 'secret'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('user can log in', () => {
    cy.visit('http://localhost:3000')
    cy.get('#username')
      .type('mlaaksonen')
    cy.get('#password')
      .type('secret')
    cy.contains('Login')
      .click()
    cy.contains('Mika Laaksonen logged in')
  })

  it('user can add blog', () => {
    cy.contains('Add new blog')
      .click()
    cy.get('#title')
      .type('Cypress tekee kaiken työn mun puolesta')
    cy.get('#author')
      .type('Mika Laaksonen')
    cy.get('#url')
      .type('www.stackoverflow.com')
    cy.contains('Add')
      .click()
    cy.contains('Cypress tekee kaiken työn mun puolesta')
  })

  it('user can log out', () => {
    cy.contains('Mika Laaksonen logged in')
    cy.contains('Log out')
      .click()
    cy.contains('Login')
  })
})