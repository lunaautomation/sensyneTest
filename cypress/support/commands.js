Cypress.Commands.add(`getListOfProducts`, () => {
    return cy.request({
        url: `v1/products`,
        method: `GET`,
        failOnStatusCode: false
    })
});

Cypress.Commands.add(`getProductById`, (productId) => {
    return cy.request({
        url: `v1/product/${productId}`,
        method: `GET`,
        failOnStatusCode: false
    })
})


Cypress.Commands.add(`deleteProductById`, (productId) => {
    return cy.request(
        {
            url: `v1/product/${productId}`,
            method: `DELETE`,
            failOnStatusCode: false
        })
})

Cypress.Commands.add(`postProduct`, (name, price) => {
    return cy.request({
        url: `v1/product`,
        method: 'POST',
        body: {
            name: name,
            price: price,
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add(`putProductById`, (productId, name, price) => {
    return cy.request({
        url: `v1/product/${productId}`,
        method: `PUT`,
        body: {
            name: name,
            price: price,
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add(`responseSchemaCheck`, (responseObj)=>{
    expect(responseObj.body).property(`product_price`).to.be.a(`number`);
    expect(responseObj.body).property(`name`).to.be.a(`string`);
    expect(responseObj.body).property(`product_code`).to.be.a(`number`);
})