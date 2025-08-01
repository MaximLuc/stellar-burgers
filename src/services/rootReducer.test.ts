import { combineReducers } from '@reduxjs/toolkit';
import burgerReducer from '../features/burger/burgerSlice';
import constructorReducer from '../features/constructor/constructorSlice';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/order/orderSlice';
import feedReducer from '../features/order/feedSlice';
import profileOrdersReducer from '../features/order/profileOrdersSlice';

const rootReducer = combineReducers({
  burger: burgerReducer,
  constructorBurger: constructorReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer
});

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toMatchObject({
      burger: expect.any(Object),
      constructorBurger: expect.any(Object),
      user: expect.any(Object),
      feed: expect.any(Object),
      profileOrders: expect.any(Object),
      order: expect.any(Object)
    });
  });
});
