describe('Api Teste',()=>{
    it('Criar User',()=>{
        cy.api({
            method:'POST',
            url:'https://serverest.dev/usuarios',
            body:{
                  "nome": "Nome teste",
                  "email": "asd@qa.com.br",
                  "password": "teste",
                  "administrador": "true"
                 }
        }).then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
            cy.env['id'] = response.body._id
        })
    })
    it('Listar Users',()=>{
        cy.api({
            method:'GET',
            url:'https://serverest.dev/usuarios'
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })
    it('Buscar Users',()=>{
        cy.api({
            method:'GET',
            url:`https://serverest.dev/usuarios/${cy.env['id']}`
        }).then((response)=>{
            expect(response.status).to.eq(200)
        })
    })
    it('Atualizar Users',()=>{
        cy.api({
            method:'PUT',
            url:`https://serverest.dev/usuarios/${cy.env['id']}`,
            body:{
                "nome": "AAAAAAAAAAAAAAAAAAAAANome teste aaaa",
                "email": "asd@qa.com.br",
                "password": "teste",
                "administrador": "true"
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro alterado com sucesso')
        })
    })
    it('Deletar Users',()=>{
        cy.api({
            method:'DELETE',
            url:`https://serverest.dev/usuarios/${cy.env['id']}`
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('Registro excluído com sucesso')
        })
    })
})