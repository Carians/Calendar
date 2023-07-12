import React, { createContext, useState, useEffect } from 'react';
import { getUserDataAPI } from './Data';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [session, setSession] = useState(window.sessionStorage.getItem('sessionid')) 
    const [userData, setUserData] = useState('')
    
    
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
