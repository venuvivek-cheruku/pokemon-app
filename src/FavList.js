import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import PokeCard from "./PokeCard";
import { Button } from "react-bootstrap";

const FavList = ({favHandler, favourites, emptyFav }) => {

    return (
        <div>
        <Container>
          <Row
            xs={2}
            md={4}
            lg={5}
            className="justify-content-between my-5 d-flex gap-3"
          >
            {favourites.map((pokemon) => (
                <PokeCard
                  key={pokemon.name}
                  name={pokemon.name}
                  image={pokemon.sprites.other.dream_world.front_default}
                  pokemonName={pokemon.name}
                  fav={favourites ? favourites.some(item => item.name === pokemon.name): 'favourites is empty'}
                  favClick={() => favHandler(pokemon)}
                />
              ))}
          </Row>
          <Button variant="primary" size="lg" onClick={emptyFav}>
        Remove all favourites
        </Button>
        </Container>
      </div>
    );
};

export default FavList;