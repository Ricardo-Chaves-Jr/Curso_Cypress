describe('Usuários - Criar (POST)', () => {

    it('deve cadastrar um novo usuário', () => {
        cy.fixture('User').then((user) => {
            cy.criar_user(user.criar_user).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.message).to.eq('Cadastro realizado com sucesso')
                Cypress.env('id', response.body._id)
            })
        })
    })

    // Remove o usuário criado para manter o ambiente limpo entre execuções.
    after(() => {
        cy.deletar_user()
    })
})
