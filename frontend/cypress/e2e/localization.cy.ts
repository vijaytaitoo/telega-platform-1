describe('Localization', () => {
  beforeEach(() => {
    cy.visit('/shop');
  });

  it('switches to Uzbek language', () => {
    cy.get('#language-selector').select('uz');
    cy.contains("Savatga qo'shish").should('be.visible');
    cy.contains('Buyurtmani rasmiylashtirish').should('be.visible');
  });

  it('displays prices in UZS', () => {
    cy.get('#currency-selector').select('UZS');
    cy.contains('100 000,00 UZS').should('be.visible');
  });

  it('switches to Russian language', () => {
    cy.get('#language-selector').select('ru');
    cy.contains('Добавить в корзину').should('be.visible');
    cy.contains('Оформить заказ').should('be.visible');
  });

  it('displays prices in RUB', () => {
    cy.get('#currency-selector').select('RUB');
    cy.contains('1 000,00 ₽').should('be.visible');
  });

  it('switches to English language', () => {
    cy.get('#language-selector').select('en');
    cy.contains('Add to Cart').should('be.visible');
    cy.contains('Checkout').should('be.visible');
  });

  it('displays prices in USD', () => {
    cy.get('#currency-selector').select('USD');
    cy.contains('$10.00').should('be.visible');
  });

  it('persists language selection', () => {
    cy.get('#language-selector').select('uz');
    cy.reload();
    cy.get('#language-selector').should('have.value', 'uz');
    cy.contains("Savatga qo'shish").should('be.visible');
  });

  it('persists currency selection', () => {
    cy.get('#currency-selector').select('UZS');
    cy.reload();
    cy.get('#currency-selector').should('have.value', 'UZS');
    cy.contains('UZS').should('be.visible');
  });
});
