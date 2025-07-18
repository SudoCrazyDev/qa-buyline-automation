/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Activities Form Page Tests', () => {

  beforeEach(() => {
    cy.viewport(1800, 900);
    cy.session('admin-login', () => {
      cy.loginToAAD(Cypress.env('admin_user_name'), Cypress.env('admin_password'))
      cy.visit('https://buyline-app.dev.porterpipe.com/')
    });
    cy.visit('https://buyline-app.dev.porterpipe.com/');
  });
  it('should log in with ADMIN role', () => {
    cy.contains('Admin').should('be.visible');
  });
  it('should be able to access inside salesman', () => {
      cy.contains('Activities Forms').should('be.visible');
      cy.contains('Activities Forms').click();
      cy.contains('Inside Salesman').click();
  });
  it('should be able to add new inside salesman activity', () => {
        cy.contains('Activities Forms').should('be.visible');
        cy.contains('Activities Forms').click();
        cy.contains('Inside Salesman').click();
        cy.intercept('GET', '/api/v1/customers*').as('customersAPI');
        cy.wait('@customersAPI', {timeout: 10000}).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .d-flex').click();
        cy.get('.border > :nth-child(2)').click();
        cy.get('#quote-number').type(faker.number.int({min: 10000000, max: 99999999}));
        cy.get('#person_talked_to').type(faker.person.fullName());
        cy.get('#plan_of_action').type(faker.lorem.sentence());
        cy.get('.mt-3 > .row input[type="checkbox"]')
        .then(($checkboxes) => {
            const numberOfCheckboxes = $checkboxes.length;
            const numToSelect = Cypress._.random(1, Math.floor(numberOfCheckboxes / 2) || 1);
            cy.log(`Selecting ${numToSelect} random checkboxes.`);
            const randomCheckboxes = Cypress._.sampleSize($checkboxes.toArray(), numToSelect);
            cy.wrap(randomCheckboxes).each(($checkbox) => {
            cy.wrap($checkbox).check();
            });
        });
        cy.get(':nth-child(1) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(1) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(2) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(2) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(3) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(3) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(4) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(4) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(5) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(5) > .form-select').select(valueToSelect);
            });
            cy.get(':nth-child(9) > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get(':nth-child(9) > .row > :nth-child(2) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get('div.mt-4 > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get('div.mt-4 > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get('#success_of_the_week').type(faker.lorem.sentence());
            cy.get('.sc-jdwyG').click();
            cy.wait(1000);
            cy.contains('Activity created successfully!').should('be.visible');
  });
  it('should be able to add new inside salesman draft activity', () => {
        cy.contains('Activities Forms').should('be.visible');
        cy.contains('Activities Forms').click();
        cy.contains('Inside Salesman').click();
        cy.intercept('GET', '/api/v1/customers*').as('customersAPI');
        cy.wait('@customersAPI').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .d-flex').click();
        cy.get('.border > :nth-child(2)').click();
        cy.get('#quote-number').type(faker.number.int({min: 10000000, max: 99999999}));
        cy.get('#person_talked_to').type(faker.person.fullName());
        cy.get('#plan_of_action').type(faker.lorem.sentence());
        cy.get('.mt-3 > .row input[type="checkbox"]')
        .then(($checkboxes) => {
            const numberOfCheckboxes = $checkboxes.length;
            const numToSelect = Cypress._.random(1, Math.floor(numberOfCheckboxes / 2) || 1);
            cy.log(`Selecting ${numToSelect} random checkboxes.`);
            const randomCheckboxes = Cypress._.sampleSize($checkboxes.toArray(), numToSelect);
            cy.wrap(randomCheckboxes).each(($checkbox) => {
            cy.wrap($checkbox).check();
            });
        });
        cy.get(':nth-child(1) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(1) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(2) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(2) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(3) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(3) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(4) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(4) > .form-select').select(valueToSelect);
            });
        cy.get(':nth-child(5) > .form-select')
            .find('option')
            .then(($options) => {
                const optionsArray = $options.toArray();
                const randomOption = Cypress._.sample(optionsArray);
                const valueToSelect = Cypress.$(randomOption).val();
                cy.get(':nth-child(5) > .form-select').select(valueToSelect);
            });
            cy.get(':nth-child(9) > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get(':nth-child(9) > .row > :nth-child(2) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get('div.mt-4 > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get('div.mt-4 > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
            cy.get('#success_of_the_week').type(faker.lorem.sentence());
            cy.get('.sc-eEVuZf').click();
            cy.wait(1000);
            cy.contains('Activity saved as draft!').should('be.visible');
  });
  it('should be able to access outside salesman', () => {
    cy.contains('Activities Forms').should('be.visible');
    cy.contains('Activities Forms').click();
    cy.contains('Outside Salesman').click();
  });
 it('should be able to add new outside salesman activity', () => {
    cy.contains('Activities Forms').should('be.visible');
    cy.contains('Activities Forms').click();
    cy.contains('Outside Salesman').click();
    cy.intercept('GET', '/api/v1/customers*').as('customersAPI');
    cy.wait('@customersAPI', {timeout: 10000}).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .d-flex').click();
    cy.get('.border > :nth-child(2)').click();
    cy.get('#quote-number').type(faker.number.int({min: 10000000, max: 99999999}));
    cy.get('#person_talked_to').type(faker.person.fullName());
    cy.get('#plan_of_action').type(faker.lorem.sentence());
    cy.get(':nth-child(6) > .row input[type="checkbox"]')
    .then(($checkboxes) => {
        const numberOfCheckboxes = $checkboxes.length;
        const numToSelect = Cypress._.random(1, Math.floor(numberOfCheckboxes / 2) || 1);
        cy.log(`Selecting ${numToSelect} random checkboxes.`);
        const randomCheckboxes = Cypress._.sampleSize($checkboxes.toArray(), numToSelect);
        cy.wrap(randomCheckboxes).each(($checkbox) => {
        cy.wrap($checkbox).check();
        });
    });
    cy.get(':nth-child(8) > .row input[type="checkbox"]')
    .then(($checkboxes) => {
        const numberOfCheckboxes = $checkboxes.length;
        const numToSelect = Cypress._.random(1, Math.floor(numberOfCheckboxes / 2) || 1);
        cy.log(`Selecting ${numToSelect} random checkboxes.`);
        const randomCheckboxes = Cypress._.sampleSize($checkboxes.toArray(), numToSelect);
        cy.wrap(randomCheckboxes).each(($checkbox) => {
        cy.wrap($checkbox).check();
        });
    });
    cy.get(':nth-child(1) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(1) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(2) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(2) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(3) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(3) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(4) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(4) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(5) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(5) > .form-select').select(valueToSelect);
        });
        cy.get(':nth-child(11) > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get(':nth-child(11) > .row > :nth-child(2) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get('div.mt-4 > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get('div.mt-4 > .row > :nth-child(2) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get('#success_of_the_week').type(faker.lorem.sentence());
        cy.get('.sc-jdwyG').click();
        cy.wait(1000);
        cy.contains('Activity created successfully!').should('be.visible');
 });
 it('should be able to add new outside salesman draft activity', () => {
    cy.contains('Activities Forms').should('be.visible');
    cy.contains('Activities Forms').click();
    cy.contains('Outside Salesman').click();
    cy.intercept('GET', '/api/v1/customers*').as('customersAPI');
    cy.wait('@customersAPI', {timeout: 10000}).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(2) > .d-flex').click();
    cy.get('.border > :nth-child(2)').click();
    cy.get('#quote-number').type(faker.number.int({min: 10000000, max: 99999999}));
    cy.get('#person_talked_to').type(faker.person.fullName());
    cy.get('#plan_of_action').type(faker.lorem.sentence());
    cy.get(':nth-child(6) > .row input[type="checkbox"]')
    .then(($checkboxes) => {
        const numberOfCheckboxes = $checkboxes.length;
        const numToSelect = Cypress._.random(1, Math.floor(numberOfCheckboxes / 2) || 1);
        cy.log(`Selecting ${numToSelect} random checkboxes.`);
        const randomCheckboxes = Cypress._.sampleSize($checkboxes.toArray(), numToSelect);
        cy.wrap(randomCheckboxes).each(($checkbox) => {
        cy.wrap($checkbox).check();
        });
    });
    cy.get(':nth-child(8) > .row input[type="checkbox"]')
    .then(($checkboxes) => {
        const numberOfCheckboxes = $checkboxes.length;
        const numToSelect = Cypress._.random(1, Math.floor(numberOfCheckboxes / 2) || 1);
        cy.log(`Selecting ${numToSelect} random checkboxes.`);
        const randomCheckboxes = Cypress._.sampleSize($checkboxes.toArray(), numToSelect);
        cy.wrap(randomCheckboxes).each(($checkbox) => {
        cy.wrap($checkbox).check();
        });
    });
    cy.get(':nth-child(1) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(1) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(2) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(2) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(3) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(3) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(4) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(4) > .form-select').select(valueToSelect);
        });
    cy.get(':nth-child(5) > .form-select')
        .find('option')
        .then(($options) => {
            const optionsArray = $options.toArray();
            const randomOption = Cypress._.sample(optionsArray);
            const valueToSelect = Cypress.$(randomOption).val();
            cy.get(':nth-child(5) > .form-select').select(valueToSelect);
        });
        cy.get(':nth-child(11) > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get(':nth-child(11) > .row > :nth-child(2) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get('div.mt-4 > .row > :nth-child(1) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get('div.mt-4 > .row > :nth-child(2) > .d-flex > .input-group > .form-control').type(faker.number.int({min: 10000, max: 500000}));
        cy.get('#success_of_the_week').type(faker.lorem.sentence());
        cy.get('.sc-eEVuZf').click();
        cy.wait(1000);
        cy.contains('Activity saved as draft!').should('be.visible');
 });
});

