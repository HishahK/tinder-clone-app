import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/client';

interface RegisterData {
  name: string;
  age: number;
  email: string;
  phone: string;
  password: string;
  biography?: string;
  latitude?: number;
  longitude?: number;
}

const registerUser = async (data: RegisterData) => {
  const response = await apiClient.post('/register', data);
  return response.data;
};

const loginUser = async (data: { email: string; password: string }) => {
  const response = await apiClient.post('/login', data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({ mutationFn: registerUser });
};

export const useLogin = () => {
  return useMutation({ mutationFn: loginUser });
};
