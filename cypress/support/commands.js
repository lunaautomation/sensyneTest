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
    cy.request(`GET`,`v1/products`).then((response) =>{
        return response
    });
 });

 Cypress.Commands.add(`getProductById`, (productId) => { 
    cy.request(`GET`,`v1/product/${productId}`).then((response) =>{
        return response
    })
 })

 Cypress.Commands.add(`putProductById`, (productId) => { 
    cy.request(`PUT`,`v1/product/${productId}`).then((response) =>{
        return response
    })
 })

 Cypress.Commands.add(`deleteProductById`, (productId) => { 
    cy.request(`DELETE`,`v1/product/${productId}`).then((response) =>{
        return response
    })
 })

 Cypress.Commands.add(`postProduct`, (name, price) => { 
    cy.request(`POST`,`v1/product/`, {
        name: name,
        price: price,
      }).then((response) =>{
        return response
    })
 })