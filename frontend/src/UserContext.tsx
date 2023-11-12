import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserDataAPI } from './Data';
import { UserContextType } from './types/context/userContextType';

type UserProviderProp = {
  children: ReactNode
}

export const UserContext = createContext<UserContextType | null>(null);

const UserProvider = ({ children }: UserProviderProp) => {
  const [session, setSession] = useState<string | null>(null);
  const [userData, setUserData] = useState<{username: string}>({username: ''});
  
    
    useEffect(()=>{
        const fetchData = async () => {
            const data = await getUserDataAPI()
            setUserData(data)
        }
        fetchData()
    },[session])
  
  
    useEffect(()=>{
        setSession(window.sessionStorage.getItem('sessionid'))
    }, [window.sessionStorage.getItem('sessionid')])

  return (
    <UserContext.Provider value={{ session, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
