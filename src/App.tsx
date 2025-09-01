import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './features/useAuth';
import { fetchShoppingLists } from './shoppingList/ShoppingListSlice';
import LoginPage from './pages/login';
import ShoppingList from './shoppingList/ShoppingList';
import ProtectedRoute from './components/ProtectedRoute';
import type { AppDispatch } from './store/store';


const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const getUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  useEffect(() => {
    const user = getUserFromLocalStorage();

    if (user) {
      dispatch(setUser(user));
      dispatch(fetchShoppingLists());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/shopping-list"
          element={
            <ProtectedRoute>
              <ShoppingList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
