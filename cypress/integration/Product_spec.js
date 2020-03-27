/// <reference types="cypress" />

context(`Product tests`,()=>{
    it(`Product List`,()=>{
        cy.getListOfProducts().then((response) =>{
            console.log(response.body)
            expect(response.status).to.equal(200)
        })

    })

    it(`Get product by Id`, ()=>{
        cy.getProductById('1').then((response) =>{
            console.log(response.body)
            expect(response.status).to.equal(200)
        })
    })
})