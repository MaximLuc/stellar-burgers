describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('http://192.168.0.202:4000/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку в конструктор', () => {
    cy.get('[data-test="constructor-no-bun-top"]').should(
      'contain',
      'Выберите булки'
    );

    cy.contains('[data-test="ingredient"]', 'Флюоресцентная булка R2-D3')
      .find('button')
      .click();

    cy.get('[data-test="constructor-bun-top"]').should(
      'contain',
      'Флюоресцентная булка R2-D3 (верх)'
    );
    cy.get('[data-test="constructor-bun-bottom"]').should(
      'contain',
      'Флюоресцентная булка R2-D3 (низ)'
    );
  });

  it('добавляет ингредиент (начинку) в конструктор', () => {
    cy.get('[data-test="constructor"]').should('contain', 'Выберите начинку');

    cy.contains(
      '[data-test="ingredient"]',
      'Котлета бессмертных моллюсков Protostomia'
    )
      .find('button')
      .click();

    cy.get('[data-test="constructor"]').should(
      'contain',
      'Котлета бессмертных моллюсков Protostomia'
    );
  });
});
