/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Quotes Module Tests', () => {

  beforeEach(() => {
    cy.viewport(1800, 900);
    cy.session('admin-login', () => {
      cy.loginToAAD(Cypress.env('admin_user_name'), Cypress.env('admin_password'))
      cy.visit('https://buyline.dev.porterpipe.com/')
    });
    cy.visit('https://buyline.dev.porterpipe.com/');
  });
  
  it('should log in with ADMIN role', () => {
    cy.contains('Admin').should('be.visible');
  });
  it('should be able to access manage buy quotes', () => {
      cy.contains('Quotes').should('be.visible');
      cy.contains('Quotes').click();
      cy.wait(2000);
      cy.contains('Manage Buy Quotes').click();
  });
  it('should be able to filter manage buy quotes using quote no. and customer name', () => {
      cy.contains('Quotes').should('be.visible');
      cy.contains('Quotes').click();
      cy.contains('Manage Buy Quotes').click();
      cy.wait(2000);
      cy.intercept('GET', '/api/v1/quotes*').as('quoteFilterApi');
      cy.get(':nth-child(1) > .form-control').type('13049707-00{enter}');
      cy.wait(2000);
      cy.wait('@quoteFilterApi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.url).to.include('quote_number=13049707-00');
      });
      cy.contains('Buy Quotes (1)').should('be.visible');
      cy.get(':nth-child(1) > .form-control').clear();
      cy.wait(2000);
      cy.intercept('GET', '/api/v1/quotes*').as('quoteFiltercustomerApi');
      cy.get('table tbody tr').should('have.length.of.at.least', 1);
      cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .form-control').type('GREAT LAKES PLUMBING & HEATING{enter}');
      cy.wait('@quoteFiltercustomerApi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.request.url).to.include('customer_name=GREAT+LAKES+PLUMBING+%26+HEATING');
      });
      cy.intercept('GET', '/api/v1/quotes*').as('QuoteFilterCustomerApiError');
      cy.get('table tbody tr').should('have.length.of.at.least', 10);
      cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .form-control').type('ASDXASDXASXAXD{enter}');
      cy.wait('@QuoteFilterCustomerApiError').then((interception) => {
        expect(interception.response.statusCode).to.eq(404);
        
      });
      cy.intercept('GET', '/api/v1/quotes*').as('QuoteFilterApiError');
      cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > .form-control').clear();
      cy.wait('@QuoteFilterApiError').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.get('.my-3 > :nth-child(1) > .form-select').select('In Progress');
      cy.intercept('GET', '/api/v1/quotes*').as('StatusFilterAPI');
      cy.wait('@StatusFilterAPI').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.get('table tbody tr').should('have.length.of.at.least', 1);
      cy.get('tbody > :nth-child(1) > :nth-child(10) > .d-flex > :nth-child(1)').click();
      cy.wait(5000)
      cy.get('#formPONumber').type('1234125')
      cy.get(':nth-child(3) > .sc-Rjrgp').clear()
      
      cy.get(':nth-child(3) > .sc-Rjrgp').click()
      cy.wait(2000)
      cy.get(':nth-child(3) > .sc-Rjrgp').type('HOOPER CORPORATION')
      cy.wait(2000)
      cy.get('body > div.fade.sc-gtLWhw.bGmVGK.modal.show > div > div > div.modal-body > form > div > div:nth-child(1) > div:nth-child(3) > div > div.sc-frniUE.brQUEf').click()
  });
   it('should be able to access In Progress Quotes page', () => {
       cy.contains('Quotes').should('be.visible');
      cy.contains('Quotes').click();
       cy.wait(2000);
       cy.contains('In Progress').click();
   });
   it('should be able to match quotes count in Manage Buy Quote and In Progress Quotes page', () => {
      let manageBuyQuotesInProgressCount = 0;
      cy.contains('Quotes').should('be.visible');
      cy.contains('Quotes').click();
      cy.contains('Manage Buy Quotes').click();
      cy.intercept('GET', '/api/v1/quotes*').as('manageBuyQuotesApi');
      cy.wait('@manageBuyQuotesApi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.get('.my-3 > :nth-child(1) > .form-select').select('In Progress');
      cy.intercept('GET', '/api/v1/quotes*').as('manageBuyQuotesFilterApi');
      cy.wait('@manageBuyQuotesFilterApi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.wait(2000);
      cy.get('.sc-etPtWW > ul > :nth-child(2)').click();
      cy.intercept('GET', '/api/v1/quotes*').as('inProgressQuotesFilterApi');
      cy.wait('@inProgressQuotesFilterApi').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        manageBuyQuotesInProgressCount = interception.response.body.meta.total;
        cy.contains(`In Progress Quotes (${interception.response.body.meta.total})`).should('be.visible');
      });
   });
   it('should be able to insert buy quotes', () => {
      cy.contains('Quotes').should('be.visible');
      cy.contains('Quotes').click();
      cy.wait(2000);
      cy.contains('Insert Data').click();
      cy.get('.form-control').type(faker.number.int({min: 10000000, max: 99999999}));
      cy.get(':nth-child(2) > .form-control').type(faker.commerce.isbn(10));
      cy.get(':nth-child(3) > .form-control').type(new Date().toLocaleDateString('en-CA'));
      cy.get(':nth-child(4) > .form-control').type(new Date().toLocaleDateString('en-CA'));
      cy.get(':nth-child(5) > .flex-row').click();
      cy.get('.border > :nth-child(2)').click();
      cy.get(':nth-child(6) > .form-control').type(new Date().toLocaleDateString('en-CA'));
      cy.get('.form-select').select('In Progress');
      cy.get(':nth-child(9) > .form-control').clear();
      cy.get(':nth-child(9) > .form-control').type(faker.number.int({min: 10000, max: 500000}));
      cy.get(':nth-child(10) > .form-control').type("RAD");
      cy.get(':nth-child(11) > .form-control').type("SAP");
      cy.get(':nth-child(12) > .form-control').type(faker.internet.email());
      cy.get('.flex-row > :nth-child(1) > .form-control').type('-00');
      cy.get('.card-body > :nth-child(1) > :nth-child(7)').should('be.visible');
      cy.wait(5000);
   });
   it('should be able to follow customer & unfollow customer', () => {
      cy.contains('Quotes').should('be.visible');
       cy.contains('Quotes').click();
      cy.contains('Follow A Customer').click();
       cy.get('.sc-etPtWW > ul > :nth-child(4) > .sc-duWCru').click();
       cy.wait(2000);
       cy.get('.sc-etPtWW > ul > :nth-child(4) > .sc-duWCru').click();
   });
});

