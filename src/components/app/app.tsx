import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { OrderInfo, IngredientDetails, Modal, AppHeader } from '@components';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useDispatch, useSelector } from '../../services/store';
import { fetchUser } from '../../features/user/userSlice';
import { getCookie } from '../../utils/cookie';

import styles from './app.module.css';
import '../../index.css';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthChecked } = useSelector((state) => state.user);

  const state = location.state as { backgroundLocation?: Location } | null;

  const isModalIngredient =
    !!state?.backgroundLocation &&
    location.pathname.startsWith('/ingredients/');
  const isModalFeed =
    !!state?.backgroundLocation && location.pathname.startsWith('/feed/');
  const isModalProfileOrder =
    !!state?.backgroundLocation &&
    location.pathname.startsWith('/profile/orders/');

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(fetchUser());
    } else {
      dispatch({ type: 'user/setAuthChecked', payload: true });
    }
  }, [dispatch]);

  if (!isAuthChecked) return null;

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={state?.backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute anonymousOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute anonymousOnly>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute anonymousOnly>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute anonymousOnly>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {isModalIngredient && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Информация о ингредиенте'
                onClose={() => navigate(-1)}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {isModalFeed && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Информация о заказе' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}

      {isModalProfileOrder && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Корзина' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
