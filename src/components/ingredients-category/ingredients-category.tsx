import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const bun = useSelector((state) => state.constructorBurger.bun);
  const constructorIngredients = useSelector(
    (state) => state.constructorBurger.ingredients
  );

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    constructorIngredients.forEach((ingredient: TIngredient) => {
      counters[ingredient._id] = (counters[ingredient._id] || 0) + 1;
    });

    if (bun?._id) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
