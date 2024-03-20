import './App.css';
import MySideNav from './MySideBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Aposta from './Pages/Aposta';
import Ranking from './Pages/Ranking';
import CriarSorteio from './Pages/CriarSorteio';
import Sorteio from './Pages/Sorteio';

function App() {
  return (
    <Router>
      <MySideNav/>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/aposta' element={<Aposta/>}/>
        <Route path='/ranking' element={<Ranking/>}/>
        <Route path='/criarSorteio' element={<CriarSorteio/>}/>
        <Route path='/sorteio' element={<Sorteio/>}/>
      </Routes>
    </Router>
  );
}

export default App;
