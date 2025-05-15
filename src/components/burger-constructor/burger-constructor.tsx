import { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '@ui';
import { fetchOrder, clearOrder } from '../../features/order/orderSlice';
import { resetConstructor } from '../../features/constructor/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients } = useSelector((state) => state.constructorBurger);
  const { order, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bun || loading) return;

    const allIds = [...ingredients.map((item) => item._id), bun._id, bun._id];
    dispatch(fetchOrder(allIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(resetConstructor());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const constructorItems = {
    bun: bun as TIngredient | null,
    ingredients
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={loading}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
