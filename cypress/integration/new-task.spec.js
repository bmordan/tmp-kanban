describe('Adding Users', () => {
    it('has a modal opened by an add task button', () => {
        cy.visit('http://localhost:3001')
        cy.get('.user-list button').click()
        cy.get('#modal').contains('Add User')
    })
    it('you can add users with a name and avatar')
})