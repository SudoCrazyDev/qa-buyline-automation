/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Promise Form Page Tests', () => {

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
  it('should be able to access Promise form', () => {
      cy.contains('Promise').should('be.visible');
      cy.contains('Promise').click();
  })
  it('should be able to fetch details Order number', () => {
        cy.contains('Promise').should('be.visible');
        cy.contains('Promise').click();
        cy.contains('Request Promise Time Window').should('be.visible');
        cy.get('.flex-fill').type ('12345678-00{enter}');
  });
  it('should be able to fetch details and see if the Order number is already exist', () => {
        cy.contains('Promise').should('be.visible');
        cy.contains('Promise').click();
        cy.contains('Request Promise Time Window').should('be.visible');
        cy.get('.flex-fill').type ('12345678-00{enter}');
        cy.wait(6000);
        cy.contains('Order number already exists in database. Order details retrieved successfully.').should('be.visible');
        cy.screenshot('Order number is already exist');
  });
  it('should be able to validate if the Order not found in CSD.', () => {
        cy.contains('Promise').should('be.visible');
        cy.contains('Promise').click();
        cy.contains('Request Promise Time Window').should('be.visible');
        cy.get('.flex-fill').type ('52345678-00{enter}');
        cy.wait(10000);
        cy.contains('Order not found in CSD.').should('exist')
        cy.screenshot('Order not found in CSD.');

  });
  it('should be able to validate if the Order is invalid order format.', () => {
        cy.contains('Promise').should('be.visible');
        cy.contains('Promise').click();
        cy.contains('Request Promise Time Window').should('be.visible');
        cy.get('.flex-fill').type ('5765762345678-00{enter}');
        cy.wait(10000);
        cy.contains('Invalid order format (e.g., 12345678-00).').should('exist')
        cy.screenshot('Order invalid order format');

  });
  it('should be able to Entered data to all fields and save', () => {
        cy.wait(5000);
        cy.contains('Promise').should('be.visible');
        cy.contains('Promise').click();
        cy.contains('Request Promise Time Window').should('be.visible');
        cy.get(':nth-child(1) > .form-select').select('5');
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').type(new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 365 * 3).toISOString().split('T')[0]);
        cy.get(':nth-child(4) > :nth-child(1) > .form-control').type(faker.company.name());
        cy.get(':nth-child(4) > :nth-child(2) > .form-control').type(faker.person.jobTitle());
        cy.get(':nth-child(5) > .form-control').type(faker.location.streetAddress());
        const phone = faker.helpers.replaceSymbols('###-###-####');
        cy.log(`Phone: ${phone}`);
        cy.get(':nth-child(6) > .form-control').type(phone);
        cy.get(':nth-child(7) > :nth-child(1) > .form-control').type(faker.location.city());
        cy.get(':nth-child(7) > :nth-child(2) > .form-control').type(faker.location.state());
        cy.get(':nth-child(1) > .input-group > .form-control').type((faker.number.float({ min: 100, max: 10000, precision: 0.1 })).toString())
        cy.get(':nth-child(2) > .input-group > .form-control').type((faker.number.float({ min: 100, max: 10000, precision: 0.1 })).toString())
        cy.get('input.form-control[value="pcalub@porterpipe.com"]')
        cy.get(':nth-child(10) > .form-control').type(faker.lorem.sentence());
        cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(11) > div:nth-child(1) > div > div').click();
        cy.get('.sc-rYtBv > :nth-child(1)').click();
        cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(11) > div:nth-child(2) > select') 
       .find('option')
       .then($options => {
        const randomIndex = Math.floor(Math.random() * $options.length);
        const value = $options[randomIndex].value;

        expect(value, 'dropdown value').to.not.be.undefined;

        cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(11) > div:nth-child(2) > select').select(value);
        cy.get('.form-check-input').click();
        cy.get('.sc-dHMlHb').click();
        cy.screenshot('Entered data to all fields and save');
   });
  });
  it('should be not able to click Send Request to Dispatch board when required field is not all filled', () => {
        cy.wait(5000);
        cy.contains('Promise').should('be.visible');
        cy.contains('Promise').click();
        cy.contains('Request Promise Time Window').should('be.visible');
        cy.get('.sc-dHMlHb').click();
        cy.contains('Please fill in all required fields').should('be.visible'); 
  });
  it('should be able to Reset the Promise Form data Inputted', () => {
        cy.wait(5000);
        cy.contains('Promise').should('be.visible');
        cy.contains('Promise').click();
        cy.contains('Request Promise Time Window').should('be.visible');
        cy.get(':nth-child(1) > .form-select').select('5');
        cy.get(':nth-child(3) > :nth-child(2) > .form-control').type(new Date(Date.now() + Math.random() * 1000 * 60 * 60 * 24 * 365 * 3).toISOString().split('T')[0]);
        cy.get(':nth-child(4) > :nth-child(1) > .form-control').type(faker.company.name());
        cy.get(':nth-child(4) > :nth-child(2) > .form-control').type(faker.person.jobTitle());
        cy.get(':nth-child(5) > .form-control').type(faker.location.streetAddress());
        const phone = faker.helpers.replaceSymbols('###-###-####');
        cy.log(`Phone: ${phone}`);
        cy.get(':nth-child(6) > .form-control').type(phone);
        cy.get(':nth-child(7) > :nth-child(1) > .form-control').type(faker.location.city());
        cy.get(':nth-child(7) > :nth-child(2) > .form-control').type(faker.location.state());
        cy.get(':nth-child(1) > .input-group > .form-control').type((faker.number.float({ min: 100, max: 10000, precision: 0.1 })).toString())
        cy.get(':nth-child(2) > .input-group > .form-control').type((faker.number.float({ min: 100, max: 10000, precision: 0.1 })).toString())
        //cy.get('.sc-DvaoS.ZVtzS.navbar.navbar-expand-lg.navbar-light.fixed-top').should('have.text', 'BuylineAdminPhilip Calub');
        cy.get(':nth-child(10) > .form-control').type(faker.lorem.sentence());
        cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(11) > div:nth-child(1) > div > div').click();
        cy.get('.sc-rYtBv > :nth-child(1)').click();
        cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(11) > div:nth-child(2) > select') 
       .find('option')
       .then($options => {
        const randomIndex = Math.floor(Math.random() * $options.length);
        const value = $options[randomIndex].value;

        expect(value, 'dropdown value').to.not.be.undefined;

        cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(11) > div:nth-child(2) > select').select(value);
        cy.get('.form-check-input').click();
        cy.get('.sc-kBpWFy').click();
        cy.screenshot('Reset Promise form');
        cy.wait(1000);
        // Date field
        cy.get(':nth-child(3) > :nth-child(2) > .form-control')
        function isValidDefaultDate(val) {
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        return val === '' || val === tomorrow;
        }

        // Company Name
        cy.get(':nth-child(4) > :nth-child(1) > .form-control').should('have.value', '');

        // Job Title
        cy.get(':nth-child(4) > :nth-child(2) > .form-control').should('have.value', '');

        // Street Address
        cy.get(':nth-child(5) > .form-control').should('have.value', '');

        // Phone Number
        cy.get(':nth-child(6) > .form-control').should('have.value', '');

        // City
        cy.get(':nth-child(7) > :nth-child(1) > .form-control').should('have.value', '');

        // State
        cy.get(':nth-child(7) > :nth-child(2) > .form-control').should('have.value', '');

        // Amount 1
        cy.get(':nth-child(1) > .input-group > .form-control').should('have.value', '0');

        // Amount 2
        cy.get(':nth-child(2) > .input-group > .form-control').should('have.value', '0');

        // Comment / Notes
        cy.get(':nth-child(10) > .form-control').should('have.value', '');

        // First dropdown (custom dropdown UI)
        //cy.get('dropdown').should('have.value', 'As Soon As Possible')

        // Second dropdown (standard <select>)
        //cy.get('form-select')
        //.should('have.value', 'No'); // adjust if default value exists

        // Checkbox unchecked
        cy.get('.form-check-input').should('not.be.checked');

   });
  });   
    
});
