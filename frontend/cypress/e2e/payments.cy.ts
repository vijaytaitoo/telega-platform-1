describe('Payments', () => {
  beforeEach(() => {
    cy.visit('/checkout');
  });

  it('processes LiqPay payment', () => {
    cy.get('#payment-method').select('LiqPay');
    cy.get('#pay-button').click();
    cy.url().should('include', 'liqpay.ua');
  });

  it('handles cash on delivery', () => {
    cy.get('#payment-method').select('cash');
    cy.get('#pay-button').click();
    cy.contains('Оплата при получении подтверждена').should('be.visible');
  });

  it('processes UzumPay payment', () => {
    cy.get('#payment-method').select('UzumPay');
    cy.get('#pay-button').click();
    cy.url().should('include', 'uzumpay.uz');
  });

  it('handles Telegram Stars payment', () => {
    cy.get('#payment-method').select('telegram-stars');
    cy.get('#pay-button').click();
    cy.contains('Оплата Telegram Stars').should('be.visible');
  });

  it('processes TON payment', () => {
    cy.get('#payment-method').select('TON');
    cy.get('#pay-button').click();
    cy.contains('TON кошелек').should('be.visible');
  });

  it('handles Bitcoin payment', () => {
    cy.get('#payment-method').select('BTC');
    cy.get('#pay-button').click();
    cy.contains('Bitcoin адрес').should('be.visible');
  });

  it('validates payment amount', () => {
    cy.get('#payment-amount').should('contain', '1000');
    cy.get('#payment-method').select('LiqPay');
    cy.get('#pay-button').click();
    cy.get('#payment-form').should('contain', '1000');
  });

  it('shows payment confirmation', () => {
    cy.get('#payment-method').select('cash');
    cy.get('#pay-button').click();
    cy.contains('Заказ оформлен').should('be.visible');
    cy.contains('Номер заказа').should('be.visible');
  });

  it('handles payment errors gracefully', () => {
    cy.intercept('POST', '/api/payments', { statusCode: 400 });
    cy.get('#payment-method').select('LiqPay');
    cy.get('#pay-button').click();
    cy.contains('Ошибка платежа').should('be.visible');
  });
});
