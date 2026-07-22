Cypress.Commands.add('criar_user', (cruser) => {
    cy.api({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/usuarios`,
        body: cruser
    }).then((response) => { return response })

})
Cypress.Commands.add('buscar_user', (id) => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/usuarios/${id}`
    }).then((response) => { return response })
})
Cypress.Commands.add('atualizar_user', (cruser) => {
    cy.api({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}/usuarios/${Cypress.env('id')}`,
        body: cruser
    }).then((response) => { return response })
})
Cypress.Commands.add('deletar_user', (id) => {
    cy.api({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/usuarios/${Cypress.env('id')}`
    }).then((response) => { return response })
})
Cypress.Commands.add('login_user', (email, senha) => {
    cy.api({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/login`,
        body: { email: email, password: senha }
    }).then((response) => { return response })
})

// Pré-condição compartilhada: cria um usuário a partir da fixture e guarda o
// _id gerado em Cypress.env('id'). Usado no hook `before` dos specs que
// precisam de um usuário já existente para operar.
Cypress.Commands.add('setup_user', () => {
    return cy.fixture('User').then((user) => {
        return cy.criar_user(user.criar_user).then((response) => {
            Cypress.env('id', response.body._id)
            return response
        })
    })
})
