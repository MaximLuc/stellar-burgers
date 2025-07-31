import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../features/order/feedSlice';
import { fetchIngredients } from '../../features/burger/burgerSlice';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector((state) => state.feed);
  const { ingredients } = useSelector((state) => state.burger);

  useEffect(() => {
    dispatch(fetchFeed());

    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  if (loading || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
