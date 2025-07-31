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
  const location = useLocation();
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.burger.ingredients);
  const isLoading = useSelector((state) => state.burger.isLoading);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients]);

  const ingredientData = ingredients.find(
    (item: TIngredient) => item._id === id
  );

  if (isLoading || !ingredients.length) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <p className='text text_type_main-medium mt-10 text-center'>
        Ингредиент не найден
      </p>
    );
  }

  const isModal = !!location.state?.backgroundLocation;

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
