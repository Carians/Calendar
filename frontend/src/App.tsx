import { useContext } from 'react';
import { UserContext } from './UserContext';
import { ThemeContext } from './ThemeContext';
import { UserContextType } from './types/context/userContextType';
import { ThemeContextType } from './types/context/themeTypes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Cards from './components/Cards';

function App() {

  const {session, userData} = useContext(UserContext) as UserContextType
  const {theme, setTheme} = useContext(ThemeContext) as ThemeContextType
  

  return (
    <div style={{backgroundColor: theme.background}} className="App">
      <Header userData={userData} session={session} theme={theme}/>
      <Main userData={userData} session={session} theme={theme} />
      <Cards/>
      <Footer theme={theme} setTheme={setTheme}/>
    </div>
  );
}

export default App;
