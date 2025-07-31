import { configureStore, combineReducers } from '@reduxjs/toolkit';
import burgerReducer from '../features/burger/burgerSlice';
import constructorReducer from '../features/constructor/constructorSlice';
import userReducer from '../features/user/userSlice';
import orderReducer from '../features/order/orderSlice';
import feedReducer from '../features/order/feedSlice';
import profileOrdersReducer from '../features/order/profileOrdersSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burger: burgerReducer,
  constructorBurger: constructorReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
