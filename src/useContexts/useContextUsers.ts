import { createContext, useContext } from 'react';
import type { IUser } from '@/types/userTypes.ts';

interface UserContextType {
  users: IUser[];
  user: IUser | null;
  getUsers: () => Promise<void>;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider!');
  }
  return context;
};
