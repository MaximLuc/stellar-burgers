describe('Оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    window.localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');

    cy.visit('http://192.168.0.202:4000/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('корректно оформляет заказ', () => {
    cy.contains('[data-test="ingredient"]', 'Флюоресцентная булка R2-D3')
      .find('button')
      .click();

    cy.contains(
      '[data-test="ingredient"]',
      'Котлета бессмертных моллюсков Protostomia'
    )
      .find('button')
      .click();

    cy.get('[data-test="order-button"]').click();
    cy.get('[data-test="modal"]').should('contain', '12345');
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="constructor-no-bun-top"]').should(
      'contain',
      'Выберите булки'
    );
    cy.get('[data-test="constructor"]').should('contain', 'Выберите начинку');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
