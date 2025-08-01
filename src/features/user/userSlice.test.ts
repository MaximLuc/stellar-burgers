import userReducer, {
  setAuthChecked,
  loginUser,
  fetchUser,
  registerUser,
  updateUser,
  logoutUser
} from './userSlice';
import { TUser } from '../../utils/types';

describe('userSlice reducer', () => {
  const initialState = {
    user: null,
    isLoading: false,
    error: null,
    isAuthChecked: false
  };

  const mockUser: TUser = { email: 'test@mail.com', name: 'test' };

  it('setAuthChecked меняет флаг isAuthChecked', () => {
    const state = userReducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  it('loginUser.fulfilled: user устанавливается, error null, isAuthChecked true', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('loginUser.rejected: error записан, isAuthChecked true', () => {
    const error = 'Ошибка авторизации';
    const action = { type: loginUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.error).toBe(error);
    expect(state.isAuthChecked).toBe(true);
  });

  it('registerUser.fulfilled: user устанавливается, error null, isAuthChecked true', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('registerUser.rejected: error записан, isAuthChecked true', () => {
    const error = 'Ошибка регистрации';
    const action = { type: registerUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.error).toBe(error);
    expect(state.isAuthChecked).toBe(true);
  });

  it('fetchUser.fulfilled: user устанавливается, isAuthChecked true', () => {
    const action = { type: fetchUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('fetchUser.rejected: user=null, isAuthChecked true', () => {
    const action = { type: fetchUser.rejected.type };
    const state = userReducer({ ...initialState, user: mockUser }, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('updateUser.fulfilled: user обновлен, error null', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { ...mockUser, name: 'updated' }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual({ ...mockUser, name: 'updated' });
    expect(state.error).toBeNull();
  });

  it('updateUser.rejected: error записан', () => {
    const error = 'Ошибка обновления';
    const action = { type: updateUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.error).toBe(error);
  });

  it('logoutUser.fulfilled: user=null, isAuthChecked true, error null', () => {
    const action = { type: logoutUser.fulfilled.type };
    const prevState = {
      ...initialState,
      user: mockUser,
      error: 'err',
      isAuthChecked: false
    };
    const state = userReducer(prevState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
    expect(state.error).toBeNull();
  });
});
