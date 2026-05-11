import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

interface AuthContextData {
  user: User | null;
  signIn: (credentials: object) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await SecureStore.getItemAsync('studyquest_user');
      const storagedToken = await SecureStore.getItemAsync('studyquest_token');

      if (storagedUser && storagedToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        setUser(JSON.parse(storagedUser));
      }
      setIsLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(credentials: object) {
    try {
    
      const response = await api.post('/auth/login', credentials);
      const { token, user: userData } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await SecureStore.setItemAsync('studyquest_token', token);
      await SecureStore.setItemAsync('studyquest_user', JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      throw new Error('Falha no login. Verifique suas credenciais.');
    }
  }

  function signOut() {
    SecureStore.deleteItemAsync('studyquest_token');
    SecureStore.deleteItemAsync('studyquest_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);