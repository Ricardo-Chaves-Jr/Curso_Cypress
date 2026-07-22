Cypress.Commands.add('criar_user', (cruser) => {
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: cruser
    }).then((response) => { return response })

})
Cypress.Commands.add('buscar_user', (id) => {
    cy.api({
        method: 'GET',
        url: `https://serverest.dev/usuarios/` + id
    }).then((response) => { return response })
})
Cypress.Commands.add('atualizar_user', (cruser) => {
    cy.api({
        method: 'PUT',
        url: `https://serverest.dev/usuarios/${cy.env['id']}`,
        body: cruser
    }).then((response) => { return response })
})
Cypress.Commands.add('deletar_user', (id) => {
    cy.api({
        method: 'DELETE',
        url: `https://serverest.dev/usuarios/${cy.env['id']}`
    }).then((response) => { return response })
})
Cypress.Commands.add('login_user', (email, senha) => {
    cy.api({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: { email: email, password: senha }
    }).then((response) => { return response })
})