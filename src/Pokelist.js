import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PokeCard from "./PokeCard";
import Loader from "./Loader";
import { Button } from "react-bootstrap";

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
    <div>
      <div className="search-bar-container mt-5">
        <h5 className="me-3 mb-0"> Search Your Desire Pokemon</h5>
      <input type="text"  placeholder="Search Pokemon" onChange={(event) => {
                setSearchTerm(event.target.value)
            }}/>
      </div>

      <Container>
        <Row
          xs={2}
          md={4}
          lg={5}
          className="justify-content-between my-5 d-flex gap-3"
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
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                // {pokemon.sprites.other.home.front_default}
                pokemonName={pokemon.name}
                fav={favourites ? favourites.some(item => item.name === pokemon.name): 'favourites is empy'}
                favClick={() => favHandler(pokemon)}
              />
            ))}
        </Row>
      </Container>
      <Button variant="primary" size="lg" onClick={getPokemons}>
        Load more
      </Button>
    </div>
  );
};

export default PokeList;