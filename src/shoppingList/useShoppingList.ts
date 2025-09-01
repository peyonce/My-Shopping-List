import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import {
  setShoppingLists,
  addShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from './ShoppingListSlice';
import type { ShoppingList } from './ShoppingListSlice';
import { apiService } from '../api/apiService';

const useShoppingList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const shoppingLists = useSelector(
    (state: RootState) => state.shoppingList.shoppingLists
  );


  const fetchShoppingLists = async () => {
    try {
      const response = await apiService.fetchShoppingLists();
      dispatch(setShoppingLists(response.data));
    } catch (error) {
      console.error('[Fetch Shopping Lists] Error:', error);
    }
  };


  const createShoppingList = async (newList: ShoppingList) => {
    try {
      const response = await apiService.addShoppingList(newList);
      dispatch(addShoppingList(response.data));
    } catch (error) {
      console.error('[Add Shopping List] Error:', error);
    }
  };


  const editShoppingList = async (updatedList: ShoppingList) => {
    try {
      const response = await apiService.updateShoppingList(
        updatedList.id,
        updatedList
      );
      dispatch(updateShoppingList(response.data));
    } catch (error) {
      console.error('[Update Shopping List] Error:', error);
    }
  };


  const removeShoppingList = async (id: number) => {
    try {
      await apiService.deleteShoppingList(id);
      dispatch(deleteShoppingList(id));
    } catch (error) {
      console.error('[Delete Shopping List] Error:', error);
    }
  };

  return {
    shoppingLists,
    fetchShoppingLists,
    createShoppingList,
    editShoppingList,
    removeShoppingList,
  };
};

export default useShoppingList;
