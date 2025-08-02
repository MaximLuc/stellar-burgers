import feedReducer, { fetchFeed } from './feedSlice';
import { TOrder } from '../../utils/types';

describe('feedSlice reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('fetchFeed.pending устанавливает loading в true и сбрасывает ошибку', () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchFeed.fulfilled сохраняет данные и loading=false', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'Заказ',
        createdAt: '',
        updatedAt: '',
        number: 123,
        ingredients: ['ingr1', 'ingr2']
      }
    ];
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: { orders, total: 10, totalToday: 5 }
    };
    const prevState = { ...initialState, loading: true };
    const state = feedReducer(prevState, action);
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
    expect(state.loading).toBe(false);
  });

  it('fetchFeed.rejected сохраняет ошибку и loading=false', () => {
    const error = 'Network error';
    const action = { type: fetchFeed.rejected.type, payload: error };
    const prevState = { ...initialState, loading: true };
    const state = feedReducer(prevState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});
