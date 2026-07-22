describe('Api Teste', () => {

    it('Criar User', () => {
        cy.fixture('User').then(function (user) {
            const cruser = user.criar_user
            cy.criar_user(cruser)
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            cy.env['id'] = response.body._id
        })
    })
    it('Listar Users', () => {
        const id = ''
        cy.buscar_user(id).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Buscar Users', () => {
        const id = cy.env['id']
        cy.buscar_user(id).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
    it('Atualizar Users', () => {
        cy.fixture('User').then(function (user) {
            const atuser = user.atualizar_user
            cy.atualizar_user(atuser)
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro alterado com sucesso')
        })
    })
    it('login Sistema', () => {
        cy.fixture('User').then(function (user) {
            const email = user.criar_user.email
            const senha = user.criar_user.password
            cy.login_user(email, senha)
           .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Login realizado com sucesso')
                cy.env['token'] = response.body.authorization
            })

        })
    })
    it('Deletar Users', () => {
        cy.deletar_user()
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.message).to.eq('Registro excluído com sucesso')
            })
    })
})