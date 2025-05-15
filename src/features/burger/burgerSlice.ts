import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

interface BurgerState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BurgerState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<
  TIngredient[],
  void,
  { rejectValue: string }
>('burger/fetchIngredients', async (_, thunkAPI) => {
  try {
    const data = await getIngredientsApi();
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.message || 'Ошибка загрузки ингредиентов'
    );
  }
});

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

export default burgerSlice.reducer;
