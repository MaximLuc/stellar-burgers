describe('Модальные окна ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://192.168.0.202:4000/');
    cy.wait('@getIngredients');
  });

  it('открывает модальное окно ингредиента', () => {
    cy.contains(
      '[data-test="ingredient"]',
      'Флюоресцентная булка R2-D3'
    ).click();
    cy.get('[data-test="modal"]')
      .should('exist')
      .and('contain', 'Флюоресцентная булка R2-D3');
  });

  it('закрывает модальное окно по клику на крестик', () => {
    cy.contains(
      '[data-test="ingredient"]',
      'Флюоресцентная булка R2-D3'
    ).click();
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should('not.exist');
  });

  it('закрывает модальное окно по клику на оверлей', () => {
    cy.contains(
      '[data-test="ingredient"]',
      'Флюоресцентная булка R2-D3'
    ).click();
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('[data-test="modal"]').should('not.exist');
  });
});
