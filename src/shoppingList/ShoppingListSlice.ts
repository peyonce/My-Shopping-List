import { createSlice } from '@reduxjs/toolkit';
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
}

const initialState: ShoppingListState = {
  shoppingLists: [],
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
});

export const { setShoppingLists, addShoppingList, updateShoppingList, deleteShoppingList } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
