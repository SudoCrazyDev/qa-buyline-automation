/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Settings Page Tests', () => {

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
  it('should be able to access Settings', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
  })
  it('should be able to turn off and turn on all Radio button such as: Notes and Status Change, Completed Buy Quotes, Send alerts to Outside Salesman?, Activities, Success of the week', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      cy.screenshot('status before');
      cy.get(':nth-child(1) > .sc-ieEEOL > .sc-kXQcRk').click();
      cy.get(':nth-child(3) > .sc-ieEEOL > .sc-kXQcRk').click();
      cy.get(':nth-child(5) > .sc-ieEEOL > .sc-kXQcRk').click();
      cy.get(':nth-child(2) > .sc-ieEEOL > .sc-kXQcRk').click();
      cy.get(':nth-child(4) > .sc-ieEEOL > .sc-kXQcRk').click();
      cy.wait(2000);
      cy.reload();
      cy.screenshot('status now')
  })
  it('should be able to add email recipient in Completed Buy Quotes Email Recipients and Save', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Completed Buy Quotes Email Recipients').should('be.visible');
      
      const email = `${Math.random().toString(36).substring(2, 8)}@porterpipe.com`;
      cy.get('.sc-fDeYYK > :nth-child(3)').type(`, ${email}`);
      cy.wait(1000);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);
    
      cy.get('.sc-fDeYYK > :nth-child(3)')
      .invoke('val')
      .then((allEmails) => {
      const lastEmail = allEmails.split(',').map(e => e.trim()).pop(); 
      cy.log('Last email entered after reload: ' + lastEmail);
      expect(lastEmail).to.equal(email); 
  });
  });
  it('should be able to add email recipient in Success of the Week Recipients and Save', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Success of the Week Recipients').should('be.visible');
      
      const email = `${Math.random().toString(36).substring(2, 8)}@porterpipe.com`;
      cy.get('.sc-fDeYYK > :nth-child(7)').type(`, ${email}`);
      cy.wait(1000);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);
    
      cy.get('.sc-fDeYYK > :nth-child(7)')
      .invoke('val')
      .then((allEmails) => {
      const lastEmail = allEmails.split(',').map(e => e.trim()).pop(); 
      cy.log('Last email entered after reload: ' + lastEmail);
      expect(lastEmail).to.equal(email); 
  });
  });
  it('should be able to add email recipient in Notes and Status Changes Email Recipients and Save', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Notes and Status Changes Email Recipients').should('be.visible');
      
      const email = `${Math.random().toString(36).substring(2, 8)}@porterpipe.com`;
      cy.get('.sc-fDeYYK > :nth-child(11)').type(`, ${email}`);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);
    
      cy.get('.sc-fDeYYK > :nth-child(11)')
      .invoke('val')
      .then((allEmails) => {
      const lastEmail = allEmails.split(',').map(e => e.trim()).pop(); 
      cy.log('Last email entered after reload: ' + lastEmail);
      expect(lastEmail).to.equal(email); 
  });
  });
  it('should be able to add email recipient in Activities Email Recipients and Save', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Activities Email Recipients').should('be.visible');
      cy.wait(1000);
      const email = `${Math.random().toString(36).substring(2, 8)}@porterpipe.com`;
      cy.get('.sc-fDeYYK > :nth-child(15)').type(`, ${email}`);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);
    
      cy.get('.sc-fDeYYK > :nth-child(15)')
      .invoke('val')
      .then((allEmails) => {
      const lastEmail = allEmails.split(',').map(e => e.trim()).pop(); 
      cy.log('Last email entered after reload: ' + lastEmail);
      expect(lastEmail).to.equal(email);
  });
  });
  it('should be able to remove email recipient in Completed Buy Quotes Email Recipients and Save', () => {
      cy.wait(2000);
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Completed Buy Quotes Email Recipients').should('be.visible');
      
      cy.get('.sc-fDeYYK > :nth-child(3)')
      .invoke('val')
      .then((allEmails) => {
      const emailList = allEmails.split(/,|;/).map(e => e.trim()).filter(Boolean);
      const removedEmail = emailList.pop(); // Remove last email
      const updatedEmails = emailList.join(', ');

      cy.get('.sc-fDeYYK > :nth-child(3)').clear().type(updatedEmails);
      cy.log('Updated email list: ' + updatedEmails);
      cy.wait(1000);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);

    
      cy.get('.sc-fDeYYK > :nth-child(3)')
      .invoke('val')
      .should('not.include', removedEmail);

     });
  });
  it('should be able to remove email recipient in Success of the Week Recipients and Save', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Success of the Week Recipients').should('be.visible');
      cy.wait(3000);
      cy.get('.sc-fDeYYK > :nth-child(7)')
      .invoke('val')
      .then((allEmails) => {
      const emailList = allEmails.split(/,|;/).map(e => e.trim()).filter(Boolean);
      const removedEmail = emailList.pop(); // Remove last email
      const updatedEmails = emailList.join(', ');

      cy.get('.sc-fDeYYK > :nth-child(7)').clear().type(updatedEmails);
      cy.log('Updated email list: ' + updatedEmails);
      cy.wait(1000);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);

    
      cy.get('.sc-fDeYYK > :nth-child(7)')
      .invoke('val')
      .should('not.include', removedEmail);

     });
  });
  it('should be able to remove email recipient in Notes and Status Changes Email Recipients and Save', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Notes and Status Changes Email Recipients').should('be.visible');
      cy.wait(3000);
      cy.get('.sc-fDeYYK > :nth-child(11)')
      .invoke('val')
      .then((allEmails) => {
      const emailList = allEmails.split(/,|;/).map(e => e.trim()).filter(Boolean);
      const removedEmail = emailList.pop(); // Remove last email
      const updatedEmails = emailList.join(', ');
      cy.wait(2000);
      cy.get('.sc-fDeYYK > :nth-child(11)').clear().type(updatedEmails);
      cy.log('Updated email list: ' + updatedEmails);
      cy.wait(1000);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);

    
      cy.get('.sc-fDeYYK > :nth-child(11)')
      .invoke('val')
      .should('not.include', removedEmail);

     });
  });
  it('should be able to remove email recipient in Activities Email Recipients and Save', () => {
      cy.contains('Settings')
      .should('be.visible')
      .click();
      cy.contains('Alerts Preferences')
      .should('be.visible')
      .click();
      cy.contains('Activities Email Recipients').should('be.visible');
      cy.wait(3000);
      cy.get('.sc-fDeYYK > :nth-child(15)')
      .invoke('val')
      .then((allEmails) => {
      const emailList = allEmails.split(/,|;/).map(e => e.trim()).filter(Boolean);
      const removedEmail = emailList.pop(); // Remove last email
      const updatedEmails = emailList.join(', ');

      
      cy.get('.sc-fDeYYK > :nth-child(15)').clear().type(updatedEmails);
      cy.log('Updated email list: ' + updatedEmails);
      cy.wait(1000);
      cy.contains('Save').click();

      cy.wait(2000);
      cy.reload();
      cy.wait(2000);

    
      cy.get('.sc-fDeYYK > :nth-child(15)')
      .invoke('val')
      .should('not.include', removedEmail);

     });
  });    
  
});

