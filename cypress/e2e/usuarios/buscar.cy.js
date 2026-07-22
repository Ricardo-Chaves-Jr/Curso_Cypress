describe('Usuários - Buscar por ID (GET)', () => {

    // Pré-condição: cria o usuário que será buscado.
    before(() => {
        cy.setup_user()
    })

    it('deve buscar o usuário criado pelo id', () => {
        cy.buscar_user(Cypress.env('id')).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body._id).to.eq(Cypress.env('id'))
        })
    })

    after(() => {
        cy.deletar_user()
    })
})
