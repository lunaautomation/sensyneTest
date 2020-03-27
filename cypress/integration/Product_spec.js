/// <reference types="cypress" />
const expectedKeys = [`name`, `product_code`, `product_price`];
const unexpected = [`id`, `name`, `price`]

context(`Product tests`, () => {
    it(`Product List`, () => {
        cy.getListOfProducts().then((response) => {
            console.log(response.body)
            expect(response.status).to.equal(200)
            //expect(response).property('body').to.be.an(`object`).that.has.all.keys(unexpected);
            response.body.forEach((item) => {
                expect(item).property('product_price').to.be.a('number')
                expect(item).property('name').to.be.a('string')
                expect(item).property('product_code').to.be.a('number')
            })
        })
    })
    
    it(`Get product by Id`, () => {
        cy.getProductById('1').then((response) => {
            console.log(response.body)
            expect(response.status).to.equal(200)
            expect(response.body).property('product_price').to.be.a('number')
            expect(response.body).property('name').to.be.a('string')
            expect(response.body).property('product_code').to.be.a('number')
        })
    })

    it.skip(`Post new item`, () => {
        cy.postProduct('Flag', 12.99).then((response) => {
            console.log(response.body)
            expect(response.status).to.equal(200)
            expect(response.body).to.be.an(`object`).that.has.all.keys(expectedKeys);
        })
    })


})