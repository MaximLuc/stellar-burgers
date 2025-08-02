import { rootReducer } from './store';
import burgerReducer from '../features/burger/burgerSlice';
import constructorReducer from '../features/constructor/constructorSlice';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/order/orderSlice';
import feedReducer from '../features/order/feedSlice';
import profileOrdersReducer from '../features/order/profileOrdersSlice';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const fakeAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, fakeAction);

    expect(state).toEqual({
      burger: burgerReducer(undefined, fakeAction),
      constructorBurger: constructorReducer(undefined, fakeAction),
      user: userReducer(undefined, fakeAction),
      feed: feedReducer(undefined, fakeAction),
      profileOrders: profileOrdersReducer(undefined, fakeAction),
      order: orderReducer(undefined, fakeAction)
    });
  });
});
