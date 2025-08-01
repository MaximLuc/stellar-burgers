import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  setBun,
  resetConstructor
} from './constructorSlice';
import { TIngredient } from '../../utils/types';

jest.mock('nanoid', () => ({
  nanoid: () => 'mocked-id'
}));

const bun: TIngredient = {
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'img',
  image_large: 'img-l',
  image_mobile: 'img-m'
};

const ingredient1: TIngredient = {
  _id: 'id1',
  name: 'Ингредиент1',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 1,
  image: 'img',
  image_large: 'img-l',
  image_mobile: 'img-m'
};

const ingredient2: TIngredient = {
  _id: 'id2',
  name: 'Ингредиент2',
  type: 'main',
  proteins: 2,
  fat: 2,
  carbohydrates: 2,
  calories: 2,
  price: 2,
  image: 'img',
  image_large: 'img-l',
  image_mobile: 'img-m'
};

describe('constructorSlice', () => {
  it('addIngredient - добавляет ингредиент', () => {
    const state = reducer(undefined, addIngredient(ingredient1));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject({
      ...ingredient1,
      id: 'mocked-id'
    });
  });

  it('removeIngredient - удаляет ингредиент по id', () => {
    const withIngredient = reducer(undefined, addIngredient(ingredient1));
    const state = reducer(withIngredient, removeIngredient('mocked-id'));
    expect(state.ingredients.length).toBe(0);
  });

  it('moveIngredient - меняет порядок ингредиентов', () => {
    const stateWithTwo = {
      bun: null,
      ingredients: [
        { ...ingredient1, id: 'id1' },
        { ...ingredient2, id: 'id2' }
      ]
    };
    const result = reducer(
      stateWithTwo,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(result.ingredients[0].id).toBe('id2');
    expect(result.ingredients[1].id).toBe('id1');
  });

  it('setBun - кладёт булку', () => {
    const state = reducer(undefined, setBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('resetConstructor - очищает конструктор', () => {
    let state = reducer(undefined, setBun(bun));
    state = reducer(state, addIngredient(ingredient1));
    state = reducer(state, resetConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients.length).toBe(0);
  });
});
