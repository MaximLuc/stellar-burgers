import profileOrdersReducer, { fetchProfileOrders } from './profileOrdersSlice';
import { TOrder } from '../../utils/types';

describe('profileOrdersSlice reducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  it('fetchProfileOrders.pending: loading=true, error=null', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchProfileOrders.fulfilled: orders записаны, loading=false', () => {
    const orders: TOrder[] = [
      {
        _id: 'order1',
        status: 'done',
        name: 'Мой бургер',
        createdAt: '',
        updatedAt: '',
        number: 5,
        ingredients: ['id1', 'id2']
      }
    ];
    const action = { type: fetchProfileOrders.fulfilled.type, payload: orders };
    const prevState = { ...initialState, loading: true };
    const state = profileOrdersReducer(prevState, action);
    expect(state.orders).toEqual(orders);
    expect(state.loading).toBe(false);
  });

  it('fetchProfileOrders.rejected: error записан, loading=false', () => {
    const error = 'Ошибка';
    const action = { type: fetchProfileOrders.rejected.type, payload: error };
    const prevState = { ...initialState, loading: true };
    const state = profileOrdersReducer(prevState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
