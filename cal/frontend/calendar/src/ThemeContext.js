import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) =>{

    const [theme, setTheme] = useState([{
            font: 'white',
            header: '#303034',
            background: '#F6F6F6',
            button: 'btn btn-primary'
    }])

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