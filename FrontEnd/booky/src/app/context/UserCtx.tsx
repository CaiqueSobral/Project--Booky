'use client';
import React from 'react';
import { createContext, useContext, useState } from 'react';

export const UserContext = createContext<any>({
  user: {} as any,
  setUser: (user: any) => {},
});

export default function UserCont({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<{}>({} as any);

  const setUser = (userParam: {}) => {
    setUserState(userParam);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
