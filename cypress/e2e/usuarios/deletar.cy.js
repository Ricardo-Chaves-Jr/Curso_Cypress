describe('Usuários - Deletar (DELETE)', () => {

    // Pré-condição: cria o usuário que será excluído.
    before(() => {
        cy.setup_user()
    })

    it('deve excluir o usuário criado', () => {
        cy.deletar_user().then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    })
})
