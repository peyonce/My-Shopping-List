import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ShoppingList {
  id: number;
  name: string;
  quantity: number;
  notes: string;
  category: string;
  image: string;
}

export interface ShoppingListState {
  shoppingLists: ShoppingList[];
  loading: boolean;
  error: string | null;
}


export const fetchShoppingLists = createAsyncThunk<
  ShoppingList[],
  void,
  { rejectValue: string }
>(
  'shoppingList/fetchShoppingLists',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/shopping-lists');
      if (!response.ok) {
        return thunkAPI.rejectWithValue('Failed to fetch shopping lists');
      }
      const data: ShoppingList[] = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Network error');
    }
  }
);

const initialState: ShoppingListState = {
  shoppingLists: [],
  loading: false,
  error: null,
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setShoppingLists(state, action: PayloadAction<ShoppingList[]>) {
      state.shoppingLists = action.payload;
    },
    addShoppingList(state, action: PayloadAction<ShoppingList>) {
      state.shoppingLists.push(action.payload);
    },
    updateShoppingList(state, action: PayloadAction<ShoppingList>) {
      const index = state.shoppingLists.findIndex(
        (list) => list.id === action.payload.id
      );
      if (index !== -1) {
        state.shoppingLists[index] = action.payload;
      }
    },
    deleteShoppingList(state, action: PayloadAction<number>) {
      state.shoppingLists = state.shoppingLists.filter(
        (list) => list.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShoppingLists.fulfilled, (state, action) => {
        state.loading = false;
        state.shoppingLists = action.payload;
      })
      .addCase(fetchShoppingLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch shopping lists';
      });
  },
});

export const {
  setShoppingLists,
  addShoppingList,
  updateShoppingList,
  deleteShoppingList,
} = shoppingListSlice.actions;

export default shoppingListSlice.reducer;
