describe('Модальные окна ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывает модальное окно ингредиента', () => {
    cy.contains(
      '[data-test="ingredient"]',
      'Флюоресцентная булка R2-D3'
    ).click();
    cy.get('[data-test="modal"]').as('modal');
    cy.get('@modal')
      .should('exist')
      .and('contain', 'Флюоресцентная булка R2-D3');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.contains(
      '[data-test="ingredient"]',
      'Флюоресцентная булка R2-D3'
    ).click();
    cy.get('[data-test="modal"]').as('modal');
    cy.get('[data-test="modal-close"]').click();
    cy.get('@modal').should('not.exist');
  });

  it('закрывает модальное окно по клику на оверлей', () => {
    cy.contains(
      '[data-test="ingredient"]',
      'Флюоресцентная булка R2-D3'
    ).click();
    cy.get('[data-test="modal"]').as('modal');
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('@modal').should('not.exist');
  });
});
