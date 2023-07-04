import { useContext } from 'react';
import { UserContext } from './UserContext';
import { ThemeContext } from './ThemeContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Cards from './components/Cards';

function App() {

  const {session, userData} = useContext(UserContext)
  const {theme} = useContext(ThemeContext)


  return (
    <div style={{backgroundColor: theme.background}} className="App">
      <Header userData={userData} session={session} theme={theme}/>
      <Main userData={userData} session={session} theme={theme} />
      <Cards/>
      <Footer/>
    </div>
  );
}

export default App;
