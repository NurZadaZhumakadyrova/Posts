import React, { type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { UserContext } from '@/useContexts/useContextUsers.ts';
import { getAllUsers } from '@/app/api/userRequests.ts';
import type { IUser } from '@/types/userTypes.ts';
import { getUser } from '@/utils';

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const dataUsers = await getAllUsers();
      if (dataUsers) {
        setUsers(dataUsers.data);
        const firstUser = getUser(dataUsers.data, { userId: 1 });
        if (firstUser) setUser(firstUser);
      }
      setLoading(false);
    };
    void getUsers();
  }, []);

  const getUsers = useCallback(async () => {
    setLoading(true);
    const dataUsers = await getAllUsers();
    if (dataUsers) {
      setUsers(dataUsers.data);
      const firstUser = getUser(dataUsers.data, { userId: 1 });
      if (firstUser) setUser(firstUser);
    }
    setLoading(false);
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        user,
        getUsers,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
