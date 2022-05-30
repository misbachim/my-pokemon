import './App.css';
import "./styles/css-pokemon-gameboy.css";
import './styles/pokemon-type-badges.css';
import './styles/pokeball.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import Pokedex from './pages/Pokedex/Pokedex';
import Pokemon from './pages/Pokemon/Pokemon';
import Navbar from './components/Navbar/Navbar';
import PokedexDetail from './pages/Pokedex/Detail/PokedexDetail';
import PokemonDetail from './pages/Pokemon/Detail/PokemonDetail';

function App() {
  return (
    <div className='flex'>
      <Navbar />
      <div className='framed'>
        <Routes>
          <Route path={'/'} exact element={<Home />} />
          <Route path={'/pokedex'} element={<Pokedex />} />
          <Route path={'/pokedex/:pokemon'} element={<PokedexDetail />} />
          <Route path={'/pokemon'} element={<Pokemon />} />
          <Route path={'/pokemon/:id'} element={<PokemonDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
