/// <reference types="cypress" />
import moment from "moment"
const expectedKeys = [`name`, `product_code`, `product_price`];
const unexpected = [`id`, `name`, `price`]

context(`GET the product list`, () => {
    it(`returns a 200 with a valid request`, () => {
        cy.getListOfProducts().then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it(`returns the expected response body and properties for each item listed`, () => {
        cy.getListOfProducts().then((response) => {
            response.body.forEach((item) => {
                expect(response).property(`body`).to.exist;
                expect(item).property(`product_price`).to.be.a(`number`);
                expect(item).property(`name`).to.be.a(`string`);
                expect(item).property(`product_code`).to.be.a(`number`);
            });
        });
    });
});

context(`GET a single product by Id`, () => {
    it(`returns a 200 with a valid request`, () => {
        cy.getProductById(`1`).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it(`returns the expected response body and properties`, () => {
        cy.getProductById(`1`).then((response) => {
            expect(response).property(`body`).to.exist;
            cy.responseSchemaCheck(response);
        });
    });
    it(`returns a 404 response when using an invalid Id`, () => {
        cy.getProductById(`abc`).then((response) => {
            expect(response.status).to.equal(404);
            expect(response).property(`body`).to.exist;
            expect(response.body).property(`detail`).to.be.a(`string`);
            expect(response.body).property(`title`).to.be.a(`string`);
            expect(response.body).property(`type`).to.be.a(`string`);
        });
    });
});

context(`POST a new product`, () => {
    it(`returns a 200 with a valid request`, () => {
        cy.postProduct(`TestPost Item${moment().unix()}`, 12.99).then((response) => {
            expect(response.status).to.equal(200);
        })
    })
    it(`returns the expected response body and properties`, () => {
        cy.postProduct(`TestPost Item${moment().unix()}`, 12.99).then((response) => {
            expect(response).property(`body`).to.exist;
            cy.responseSchemaCheck(response);
        });
    });
    it(`and it shows on the product list`, () => {
        let testName = `TestPost Item${moment().unix()}`;
        cy.postProduct(testName, 12.99).then((response) => {
            cy.getListOfProducts().then((response) => {
                response.body.forEach((item) => {
                    if (item.name.includes(testName)) {
                        expect(item).to.include({ name: testName });
                        expect(item).to.include({ price: "12.99" });
                    }
                });
            });
        });
    });
    it(`returns a 400 with price sent as a string`, () => {
        cy.postProduct(`TestPost Item${moment().unix()}`, "12.99").then((response) => {
            expect(response.status).to.equal(400);
            expect(response).property(`body`).to.exist;
            expect(response.body).property(`detail`).to.be.a(`string`);
            expect(response.body).property(`title`).to.be.a(`string`);
            expect(response.body).property(`type`).to.be.a(`string`);
        });
    });
    it(`returns a 400 with name sent as a integer`, () => {
        cy.postProduct(12345, 12.99).then((response) => {
            expect(response.status).to.equal(400);
            expect(response).property(`body`).to.exist;
            expect(response.body).property(`detail`).to.be.a(`string`);
            expect(response.body).property(`title`).to.be.a(`string`);
            expect(response.body).property(`type`).to.be.a(`string`);
        });
    });
});

context(`PUT a product`, () => {
    let defaultId = `1`;
    let defaultName = `Lavender heart`;
    let defaultPrice = 12.99;

    it(`returns a 200 with a valid request`, () => {
        cy.putProductById(defaultId, defaultName, defaultPrice).then((response) => {
            expect(response.status).to.equal(200);
        });
    });
    it(`returns the expected response body and properties`, () => {
        cy.putProductById(defaultId, defaultName, defaultPrice).then((response) => {
            expect(response).property(`body`).to.exist;
            cy.responseSchemaCheck(response);
        });
    });
    it(`returns a 404 if user sends an invalid id`, () => {
        cy.putProductById(`abc`, defaultName, defaultPrice).then((response) => {
            expect(response.status).to.equal(404);
            expect(response).property(`body`).to.exist;
            expect(response.body).property(`detail`).to.be.a(`string`);
            expect(response.body).property(`title`).to.be.a(`string`);
            expect(response.body).property(`type`).to.be.a(`string`);
        });
    });
});

context(`DELETE an product`, () => {
    it(`returns a 200 with a valid request`, () => {
        cy.postProduct(`TestDelete Item${moment().unix()}`, 12.99).then((response) => {
            cy.deleteProductById(response.body.product_code.toString()).then((response) => {
                expect(response.status).to.eq(200);
            });
        });
    });
    it(`returns the expected response body and properties`, () => {
        cy.postProduct(`TestDelete Item${moment().unix()}`, 12.99).then((response) => {
            cy.deleteProductById(response.body.product_code.toString()).then((response) => {
                expect(response).property(`body`).to.exist;
                cy.responseSchemaCheck(response);
            });
        });
    });
    it(`returns a 404 if invalid id is sent`, () => {
        cy.deleteProductById(`abcd`).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});