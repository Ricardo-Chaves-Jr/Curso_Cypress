describe('Usuários - Login (POST)', () => {

    // Pré-condição: cria o usuário que fará login.
    before(() => {
        cy.setup_user()
    })

    it('deve realizar login com sucesso', () => {
        cy.fixture('User').then((user) => {
            cy.login_user(user.criar_user.email, user.criar_user.password).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Login realizado com sucesso')
                Cypress.env('token', response.body.authorization)
            })
        })
    })

    after(() => {
        cy.deletar_user()
    })
})
