import orderReducer, { fetchOrder, clearOrder } from './orderSlice';
import { TOrder } from '../../utils/types';

describe('orderSlice reducer', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  it('fetchOrder.pending ставит loading=true и error=null', () => {
    const action = { type: fetchOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchOrder.fulfilled сохраняет order и loading=false', () => {
    const order: TOrder = {
      _id: '123',
      status: 'done',
      name: 'Бургер',
      createdAt: '',
      updatedAt: '',
      number: 100,
      ingredients: ['ingr1', 'ingr2']
    };
    const action = { type: fetchOrder.fulfilled.type, payload: order };
    const prevState = { ...initialState, loading: true };
    const state = orderReducer(prevState, action);
    expect(state.order).toEqual(order);
    expect(state.loading).toBe(false);
  });

  it('fetchOrder.rejected сохраняет ошибку и loading=false', () => {
    const error = 'Ошибка';
    const action = { type: fetchOrder.rejected.type, payload: error };
    const prevState = { ...initialState, loading: true };
    const state = orderReducer(prevState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('clearOrder сбрасывает order и error', () => {
    const stateWithOrder = {
      order: {
        _id: '1',
        status: 'done',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 1,
        ingredients: []
      },
      loading: false,
      error: 'some error'
    };
    const state = orderReducer(stateWithOrder, clearOrder());
    expect(state.order).toBeNull();
    expect(state.error).toBeNull();
  });
});
