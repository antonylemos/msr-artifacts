// Auth SDK
import { httpClient } from '../http';
import type { LoginCredentials, AuthResponse } from '@mf/types';

export const login = async (credentials: LoginCredentials) => {
  return httpClient.post<AuthResponse>('/auth/login', credentials);
};
