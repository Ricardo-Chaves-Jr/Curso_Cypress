describe('Usuários - Listar (GET)', () => {

    it('deve listar todos os usuários', () => {
        cy.buscar_user('').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('usuarios')
        })
    })
})
