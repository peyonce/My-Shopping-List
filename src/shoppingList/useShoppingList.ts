import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import {
  setShoppingLists,
  addShoppingList,
  updateShoppingList,
  deleteShoppingList,
  ShoppingList,
} from '../shoppingList/ShoppingListSlice';
import { apiService } from '../api/apiService';

const useShoppingList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shoppingLists = useSelector((state: RootState) => state.shoppingList.shoppingLists);

  const fetchShoppingLists = async () => {
    try {
      const response = await apiService.fetchShoppingLists();
      dispatch(setShoppingLists(response.data));
    } catch (error) {
      console.error('Failed to fetch shopping lists:', error);
    }
  };

  const createShoppingList = async (newList: ShoppingList) => {
    try {
      const response = await apiService.addShoppingList(newList);
      dispatch(addShoppingList(response.data));
    } catch (error) {
      console.error('Failed to add shopping list:', error);
    }
  };

  const editShoppingList = async (updatedList: ShoppingList) => {
    try {
      const response = await apiService.updateShoppingList(updatedList.id, updatedList);
      dispatch(updateShoppingList(response.data));
    } catch (error) {
      console.error('Failed to update shopping list:', error);
    }
  };

  const removeShoppingList = async (id: number) => {
    try {
      await apiService.deleteShoppingList(id);
      dispatch(deleteShoppingList(id));
    } catch (error) {
      console.error('Failed to delete shopping list:', error);
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
