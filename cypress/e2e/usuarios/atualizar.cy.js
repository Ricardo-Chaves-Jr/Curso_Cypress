describe('Usuários - Atualizar (PUT)', () => {

    // Pré-condição: cria o usuário que será atualizado.
    before(() => {
        cy.setup_user()
    })

    it('deve atualizar os dados do usuário', () => {
        cy.fixture('User').then((user) => {
            cy.atualizar_user(user.atualizar_user).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro alterado com sucesso')
            })
        })
    })

    after(() => {
        cy.deletar_user()
    })
})
