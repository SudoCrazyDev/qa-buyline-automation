/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
function loginViaAAD(username: string, password: string){
    cy.visit('https://buyline.dev.porterpipe.com/');
    cy.wait(10000);
    
    cy.origin(
        'login.microsoftonline.com',
        {
        args: {
            username,
            password
        },
        },
        ({ username }) => {
        cy.get('input[type="email"]').type(username, {
            log: false,
        })
        cy.get('input[type="submit"]').click()
        }
    )
    
    cy.origin(
        'login.microsoftonline.com',
        {
        args: {
            password
        },
        },
        ({ password }) => {
        cy.get('input[type="password"]').type(password, {
            log: false,
        })
        cy.get('input[type="submit"]').click()
        }
    )
    
    cy.origin(
        'login.microsoftonline.com',
        {
        args: {
            password
        },
        },
        () => {
            cy.get('input[type="submit"]').click()
        }
    )
    
    cy.wait(10000);
    cy.url().should('equal', 'https://buyline.dev.porterpipe.com/');
}

Cypress.Commands.add('loginToAAD', (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'Azure Active Directory Login',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })
  log.snapshot('before')

  loginViaAAD(username, password)

  log.snapshot('after')
  log.end()
})