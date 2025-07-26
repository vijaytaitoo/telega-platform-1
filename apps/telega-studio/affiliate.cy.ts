/// <reference types="cypress" />

describe('Affiliate Page', () => {
  beforeEach(() => {
    cy.visit('/affiliate');
  });

  it('should display affiliate page and generate link', () => {
    // Check page title
    cy.get('h1').should('contain', 'Referral Program');

    // Check initial state
    cy.get('button').contains('Generate Link').should('be.visible');

    // Generate referral link
    cy.get('button').contains('Generate Link').click();

    // Verify link format
    cy.get('input')
      .should('have.value')
      .and('match', /^https:\/\/t\.me\/TeleGaApp\?start=[a-zA-Z0-9]{8}$/);
  });

  it('should show stats after generating link', () => {
    // Generate link first
    cy.get('button').contains('Generate Link').click();

    // Check stats are displayed
    cy.get('p').should('contain', 'Referrals: 0');
    cy.get('p').should('contain', 'Teleton Earned: 0');

    // Verify link is copied to clipboard (if copy functionality exists)
    cy.get('input').should('be.visible');
  });

  it('should handle authentication errors', () => {
    // Mock unauthenticated state
    cy.intercept('POST', '/api/affiliate/link', {
      statusCode: 401,
      body: { message: 'User not authenticated' },
    }).as('authError');

    cy.get('button').contains('Generate Link').click();
    cy.wait('@authError');

    // Should show error message
    cy.get("[data-testid='error-message']").should('contain', 'Please log in');
  });

  it('should display loading state during API call', () => {
    // Mock slow API response
    cy.intercept('POST', '/api/affiliate/link', {
      delay: 1000,
      body: { referralLink: 'https://t.me/TeleGaApp?start=abc123' },
    }).as('generateLink');

    cy.get('button').contains('Generate Link').click();

    // Check loading state
    cy.get('button').should('be.disabled');
    cy.get("[data-testid='loading-spinner']").should('be.visible');

    cy.wait('@generateLink');

    // Check final state
    cy.get('button').should('not.be.disabled');
    cy.get("[data-testid='loading-spinner']").should('not.exist');
  });

  it('should copy link to clipboard', () => {
    // Mock clipboard API
    cy.window().then((win: Window) => {
      cy.stub(win.navigator.clipboard, 'writeText').resolves();
    });

    cy.get('button').contains('Generate Link').click();
    cy.get('button').contains('Copy Link').click();

    // Verify clipboard was called
    cy.window().its('navigator.clipboard.writeText').should('be.called');
  });
});
