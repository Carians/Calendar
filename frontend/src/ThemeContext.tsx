import React, { createContext, useState, ReactNode } from 'react';
import { ThemeState, ThemeContextType } from './types/context/themeTypes';

export const ThemeContext = createContext<ThemeContextType | null>(null);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) =>{

    const [theme, setTheme] = useState<ThemeState>({
        font: 'white',
        header: '#303034',
        background: '#F6F6F6',
        button: 'btn btn-primary'
    })

    //TODO Cannot read properties of null (reading 'background')
    // useEffect(()=>{
    //     setTheme(JSON.parse(window.localStorage.getItem('theme')))
    // }, [window.localStorage.getItem('theme')])


    return(
        <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider