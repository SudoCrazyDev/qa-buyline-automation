// cypress/support/commands.d.ts
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    mockLogin(): Chainable<void>;
    loginToAAD(username: string, password: string): Chainable<void>;
  }
}