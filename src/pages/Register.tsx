import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { apiService } from '../api/apiService';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    cell: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiService.register(formData);
      dispatch(setUser(response.data));
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="First Name" value={formData.name} onChange={handleChange} />
        <Input type="text" name="surname" placeholder="Last Name" value={formData.surname} onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <Input type="text" name="cell" placeholder="Cell Number" value={formData.cell} onChange={handleChange} />
        <Button onClick={handleSubmit}>Register</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
