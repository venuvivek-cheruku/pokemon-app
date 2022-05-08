import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PokeCard from "./PokeCard";
import Loader from "./Loader";
import { Button } from "react-bootstrap";
import { type } from "@testing-library/user-event/dist/type";

const PokeList = ({ favHandler, favourites }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPokemons, setNextPokemons] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0"
  );

 const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    axios
      .get(nextPokemons)
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        const fetches = res.data.results.map((p) =>
          axios.get(p.url).then((res) => res.data)
        );

        setNextPokemons(res.data.next);

        Promise.all(fetches).then((data) => {
          setPokemons((prevState) => [...prevState, ...data]);
        });
        setIsLoading(false);
        // console.log(pokemons);
        // console.log(nextPokemons);
      });
  };

  return (
    <div className="main-container">
      <div className="search-bar-container p-5">
        <h5 className="me-3 mb-0"> Search Your Desire Pokemon</h5>
      <input type="text"  placeholder="Search Pokemon" onChange={(event) => {
                setSearchTerm(event.target.value)
            }}/>
      </div>

      <Container className="pokemon-grid-container">
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between d-flex gap-4"
        >
          {isLoading && <Loader />}
          {!isLoading &&

            pokemons.filter((pokemon, index) => {
                if(searchTerm === ""){
                return pokemon;
            } 
            else if (pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))

                return pokemon
            }).map((pokemon) => (
              <PokeCard
                key={pokemon.name}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                // {pokemon.sprites.other.home.front_default}
                pokemonName={pokemon.name}
                fav={favourites ? favourites.some(item => item.name === pokemon.name): 'favourites is empy'}
                favClick={() => favHandler(pokemon)}
              />
            ))}
        </Row>
      </Container>
      <div className="load-btn m-5">
        <Button variant="danger"  size="lg" onClick={getPokemons}>
        Load more
      </Button>
      </div>
      
    </div>
  );
};

export default PokeList;