import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const apiService = {
  register: (data: any) => api.post('/users', data),
  login: (data: any) => api.post('/auth/login', data),
  fetchShoppingLists: () => api.get('/shoppingLists'),
  addShoppingList: (data: any) => api.post('/shoppingLists', data),
  updateShoppingList: (id: number, data: any) => api.put(`/shoppingLists/${id}`, data),
  deleteShoppingList: (id: number) => api.delete(`/shoppingLists/${id}`),

  getUserFromlocalStorage: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
};
