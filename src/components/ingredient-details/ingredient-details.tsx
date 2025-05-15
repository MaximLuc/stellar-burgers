import { FC, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../features/burger/burgerSlice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { TIngredient } from '../../utils/types';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const location = useLocation();

  const { ingredients, isLoading } = useSelector((state) => state.burger);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

  const ingredientData = ingredients.find(
    (item: TIngredient) => item._id === id
  );

  const isModal = location.state?.backgroundLocation;

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return (
    <div className={!isModal ? styles.fullPageWrapper : ''}>
      {!isModal && (
        <h2 className='text text_type_main-large mt-10 mb-5 text-center'>
          Детали ингредиента
        </h2>
      )}
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
