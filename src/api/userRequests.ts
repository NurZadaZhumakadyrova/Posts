import baseURL from '@/api/baseURL.ts';
import type { IUser } from '@/types/userTypes.ts';

export const getAllUsers = async () => {
  try {
    return (await baseURL.get<IUser[]>('/users')) || [];
  } catch (e) {
    console.log(e);
  }
};

