Cypress.Commands.add(`getListOfProducts`, () => {
    return cy.request(`GET`, `v1/products`)
});

Cypress.Commands.add(`getProductById`, (productId) => {
    return cy.request(`GET`, `v1/product/${productId}`)
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