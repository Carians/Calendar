import { useContext } from 'react';
import { UserContext } from './UserContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Cards from './components/Cards';

function App() {

  const {session, userData} = useContext(UserContext)

  return (
    <div className="App">
      <Header userData={userData} session={session}/>
      <Main userData={userData} session={session} />
      <Cards/>
      <Footer/>
    </div>
  );
}

export default App;
