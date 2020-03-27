// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add(`getListOfProducts`, () => {
    return cy.request(`GET`, `v1/products`)
});

Cypress.Commands.add(`getProductById`, (productId) => {
    return cy.request(`GET`, `v1/product/${productId}`)
})

Cypress.Commands.add(`putProductById`, (productId) => {
    return cy.request(`PUT`, `v1/product/${productId}`)
})

Cypress.Commands.add(`deleteProductById`, (productId) => {
    return cy.request(`DELETE`, `v1/product/${productId}`)
})

Cypress.Commands.add(`postProduct`, (name, price) => {
    return cy.request(`POST`, `v1/product`, {
        name: name,
        price: price,
    })
})