// src/App.tsx
import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './features/useAuth';
import { fetchShoppingLists } from './shoppingList/ShoppingListSlice';
import { apiService } from './api/apiService';
import LoginPage from './pages/login';
import ShoppingListPage from './shoppingList/ShoppingListSlice';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const user = apiService.getUserFromLocalStorage();
    if (user) {
      dispatch(setUser(user));
    }


    if (user) {
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
              <ShoppingListPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
