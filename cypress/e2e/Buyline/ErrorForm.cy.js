/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Error Form Form Page Tests', () => {

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
  it('should be able to access Error Form', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.screenshot('Error Form modal');
  });
  it('should be able to fetch details Sales Order', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.get(':nth-child(1) > .flex-fill').type('12345678-00');
      cy.get(':nth-child(2) > .flex-fill').type('1');
      cy.contains('Search').click();
      cy.screenshot('Error Form Fetch Data');
  });
  it('should be able to fetch details Sales Order already Exist', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.get(':nth-child(1) > .flex-fill').type('12345678-00');
      cy.get(':nth-child(2) > .flex-fill').clear();
      cy.get(':nth-child(2) > .flex-fill').type('1');
      cy.contains('Search').click();
      cy.get('.alert').should('be.visible');
      cy.screenshot('Error Form Fetch Data');
  });
  it('should be able to validate if the Invalid sales order number format', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.get(':nth-child(1) > .flex-fill').type('1234567821312-00');
      cy.get(':nth-child(2) > .flex-fill').clear();
      cy.get(':nth-child(2) > .flex-fill').type('1');
      /*cy.intercept('POST', '@populate?order_number').as('customersAPI');
      cy.wait('@customersAPI').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });*/
      cy.contains('Search').click();
      cy.wait(7000);
      cy.contains("Invalid sales order number format. Expected formats: '12345678-00' or '123456-00'.").should('be.visible');
      cy.screenshot('Error Form Fetch Data');
  });
  it('should be able to validate if the Sales Order Number is not found in CSD', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.get(':nth-child(1) > .flex-fill').type('51234523-00');
      cy.get(':nth-child(2) > .flex-fill').clear();
      cy.get(':nth-child(2) > .flex-fill').type('1');
      cy.contains('Search').click();
      cy.wait(8000);
      cy.contains("Not found in CSD. No details to populate.").should('exist')
      cy.screenshot('Order not found in CSD.');
  });
  it('should be able to Entered data to all fields', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.get(':nth-child(1) > .flex-fill').type('12345678-00');
      cy.get(':nth-child(2) > .flex-fill').clear();
      cy.get(':nth-child(2) > .flex-fill').type('1');
      cy.contains('Search').click();
      cy.get('[name="customer_number"]')
      .clear()
      .type(`CUST-${faker.number.int({ min: 100, max: 9999 })}`);
      const partName = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} Part`;
      cy.get('[name="order_part_name"]')
      .clear()
      .type(partName);
      cy.get('[name="received_part_name"]')
      .clear()
      .type(partName);

      cy.get(':nth-child(3) > .row > :nth-child(1) > .form-control')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get(':nth-child(3) > .row > :nth-child(2) > .form-control')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get('[name="received_part_quantity"]')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div').click();
      cy.contains('Mixed Bin').click();
      cy.get('.mb-3 > .form-control').type(faker.lorem.sentence());
      cy.screenshot('Filled all field');
  });
  it('should be able to Entered data to all fields and save', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.get(':nth-child(1) > .flex-fill').type('12345678-00');
      cy.get(':nth-child(2) > .flex-fill').clear();
      cy.get(':nth-child(2) > .flex-fill').type('1');
      cy.contains('Search').click();
      cy.get('[name="customer_number"]')
      .clear()
      .type(`CUST-${faker.number.int({ min: 100, max: 9999 })}`);
      const partName = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} Part`;
      cy.get('[name="order_part_name"]')
      .clear()
      .type(partName);
      cy.get('[name="received_part_name"]')
      .clear()
      .type(partName);

      cy.get(':nth-child(3) > .row > :nth-child(1) > .form-control')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get(':nth-child(3) > .row > :nth-child(2) > .form-control')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get('[name="received_part_quantity"]')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div').click();
      cy.contains('Mixed Bin').click();
      cy.get('.mb-3 > .form-control').type(faker.lorem.sentence());
      cy.get('.d-inline-block > .sc-dHMlHb').click();
      cy.screenshot('Filled all field and Save');
  });
  it('should be able to Reset all field filled', () => {
      cy.contains('Error Form')
      .should('be.visible')
      .click();
      cy.get(':nth-child(1) > .flex-fill').type('12345678-00');
      cy.get(':nth-child(2) > .flex-fill').clear();
      cy.get(':nth-child(2) > .flex-fill').type('1');
      cy.contains('Search').click();
      cy.get('[name="customer_number"]')
      .clear()
      .type(`CUST-${faker.number.int({ min: 100, max: 9999 })}`);
      const partName = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} Part`;
      cy.get('[name="order_part_name"]')
      .clear()
      .type(partName);
      cy.get('[name="received_part_name"]')
      .clear()
      .type(partName);
      cy.get(':nth-child(3) > .row > :nth-child(1) > .form-control')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get(':nth-child(3) > .row > :nth-child(2) > .form-control')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get('[name="received_part_quantity"]')
      .clear()
      .type(faker.number.int({ min: 1, max: 1000 }).toString());
      cy.get('#root > div > div:nth-child(2) > div > div.sc-PBvYm.fbSeft > div > form > div:nth-child(4) > div:nth-child(3) > div:nth-child(1) > div').click();
      cy.contains('Picked from Wrong Bay').click();
      cy.get('.mb-3 > .form-control').type(faker.lorem.sentence());
      cy.get('.sc-kBpWFy').click();
      cy.screenshot('Clear all field');
  });
})