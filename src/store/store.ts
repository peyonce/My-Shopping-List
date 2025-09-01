import { configureStore } from '@reduxjs/toolkit';
import shoppingListReducer from '../shoppingList/ShoppingListSlice';
import authReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    shoppingList: shoppingListReducer,
    auth: authReducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


