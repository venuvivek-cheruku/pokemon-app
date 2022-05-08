import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Pokelist from './Pokelist';
import Layout from './Layout';
import Home from './Home';
import './index.css';
import PokeSingle from './PokeSingle';
import FavList from './FavList';


const App = () => {
  const [favourites, setFavourites] = useState([]);

  const getArray = JSON.parse(localStorage.getItem('favourites'))

  useEffect(() => {
      setFavourites(getArray)
  }, []);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites]);

  const favHandler = (pokemon) => {
    let item = favourites.some(item => item.id === pokemon.id);

    if (!item) {
      setFavourites(favourites => [...favourites, pokemon])
    } else {
      const newArray = [...favourites];
      newArray.splice(newArray.findIndex(item => item.id === pokemon.id), 1);
      setFavourites(newArray);
    }
  };

  const emptyFavourites = () => {
    if (favourites) {
      localStorage.removeItem('favourites');
      setFavourites([]);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='pokelist' element={<Pokelist favHandler={favHandler} favourites={favourites}/>} />
          <Route path='/:pokemonName' element={<PokeSingle />} />
          <Route path='favourites' element={<FavList emptyFav={emptyFavourites} favHandler={favHandler} favourites={favourites}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;