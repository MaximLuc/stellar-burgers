import burgerReducer, { fetchIngredients } from './burgerSlice';
import { TIngredient } from '../../utils/types';

describe('burgerSlice reducer', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('fetchIngredients.pending: isLoading=true, error=null', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = burgerReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchIngredients.fulfilled: ingredients записаны, isLoading=false', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };
    const prevState = { ...initialState, isLoading: true };
    const state = burgerReducer(prevState, action);
    expect(state.ingredients).toEqual(ingredients);
    expect(state.isLoading).toBe(false);
  });

  it('fetchIngredients.rejected: error записан, isLoading=false', () => {
    const error = 'Ошибка';
    const action = { type: fetchIngredients.rejected.type, payload: error };
    const prevState = { ...initialState, isLoading: true };
    const state = burgerReducer(prevState, action);
    expect(state.error).toBe(error);
    expect(state.isLoading).toBe(false);
  });
});
