/// <reference types="cypress" />
import moment from 'moment';
const expectedKeys = [`name`, `product_code`, `product_price`];
const unexpected = [`id`, `name`, `price`]

context(`GET the product list`, () => {
    it(`returns a 200 response`, () => {
        cy.getListOfProducts().then((response) => {
            expect(response.status).to.equal(200)
        })
    })
    it(`returns a list of products with the expected properties`, () => {
        cy.getListOfProducts().then((response) => {
            response.body.forEach((item) => {
                expect(item).property('product_price').to.be.a('number')
                expect(item).property('name').to.be.a('string')
                expect(item).property('product_code').to.be.a('number')
            })
        })
    })
});

context(`GET a single product by Id`, () => {
    it(`returns a 200 response`, () => {
        cy.getProductById('1').then((response) => {
            expect(response.status).to.equal(200)
        })
    })
    it(`returns the expected response body properties`, () => {
        cy.getProductById('1').then((response) => {
            expect(response.body).property('product_price').to.be.a('number')
            expect(response.body).property('name').to.be.a('string')
            expect(response.body).property('product_code').to.be.a('number')
        })
    })
})

context(`POST a new product`, () => {
    it(`returns a 200 with a valid request`, () => {
        cy.postProduct(`TestPost Item${moment().unix()}`, 12.99).then((response) => {
            expect(response.status).to.equal(200)           
        })
    })
    it(`returns the expected response body properties`, () => {
        cy.postProduct(`TestPost Item${moment().unix()}`, 12.99).then((response) => {
            expect(response).property('body').to.exist();
            expect(response.body).property('product_price').to.be.a('number')
            expect(response.body).property('name').to.be.a('string')
            expect(response.body).property('product_code').to.be.a('number')
        })
    })
    it(`and it shows on the product list`, () => {
        let testName =`TestPost Item${moment().unix()}`;
        cy.postProduct(testName, 12.99).then((response) => {
            cy.getListOfProducts().then((response) =>{
                response.body.forEach((item) =>{
                    if(item.name.includes(testName)){
                        expect(item).to.include({name:testName});
                        expect(item).to.include({price:"12.99"});
                    }
                })
            })        
        })
    })
    it(`returns a 400 with price sent as a string`, () => {
        cy.postProduct(`TestPost Item${moment().unix()}`, "12.99").then((response) => {
            expect(response.status).to.equal(400)
        })
    })
    it(`returns a 400 with name sent as a integer`, () => {
        cy.postProduct(12345, 12.99).then((response) => {
            expect(response.status).to.equal(400)
        })
    })
})

context(`DELETE an product`, () => {
    it(`returns a 200 with a valid request`, () => {
        cy.postProduct(`TestDelete Item${moment().unix()}`, 12.99).then((response) => {
            cy.deleteProductById(response.body.product_code.toString()).then((response) => {
                expect(response.status).to.eq(200);
            })
        })
    })
    it(`returns the expected response body properties`, () => {
        cy.postProduct(`TestDelete Item${moment().unix()}`, 12.99).then((response) => {
            cy.deleteProductById(response.body.product_code.toString()).then((response) => {
                expect(response).property('body').to.exist();
                expect(response.body).property('product_price').to.be.a('number')
                expect(response.body).property('name').to.be.a('string')
                expect(response.body).property('product_code').to.be.a('number')
            })
        })
    })
    it(`returns a 404 if invalid id is sent`,()=>{
        cy.deleteProductById(`abcd`).then((response) => {
            expect(response.status).to.eq(404);
        })
    })
})