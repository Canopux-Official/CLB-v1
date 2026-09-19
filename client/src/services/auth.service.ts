import api from './api';

export const googleSignIn = async (token: string, role?: 'CUSTOMER' | 'PROVIDER') => {
  const response = await api.post('/auth/google', { token, role });
  return response.data;
};
