import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Cards from './components/Cards';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Cards/>
      <Footer/>
    </div>
  );
}

export default App;
