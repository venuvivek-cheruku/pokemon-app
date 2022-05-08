import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Button } from "react-bootstrap";

const TYPE_COLORS = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "823551D",
  fire: "E73B0C",
  flying: "A3B3F7",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "C8C4BC",
  poison: "934594",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
};

const PokeSingle = () => {
  let { pokemonName } = useParams();
  let navigate = useNavigate();
  const [poke, setPoke] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        setPoke(res.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="detail-page-container">
      <div className="detail-page-card">
        {isLoading && <Loader />}
        {!isLoading && (
          <div className="mt-5">
            <div className=" d-flex justify-content-center">
              <img
                src={poke.sprites.other.dream_world.front_default}
                alt={poke.name}
              />
            </div>

            <h1 className="mt-2 text-center main-text text-capitalise">
              {poke.name}
            </h1>
            <div className="detail-pokemon-type">
              {poke.types.map((type, index) => (
                <span
                  key={index}
                  className="badge badge-primary badge-pill m-2 text-capitalise"
                  style={{
                    backgroundColor: `#${TYPE_COLORS[type.type.name]}`,
                    color: "white",
                  }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className=" mt-1 p-2 d-flex detail-base-content border-bottom">
              <p>Base experience: {poke.base_experience}</p>
              <p>Height: {poke.height}</p>
              <p>Weigth: {poke.weight}</p>
            </div>

            <div className=" d-flex stats-container ">
              <h4 className="mt-3">STATS:</h4>
              {poke.stats.map((stat, index) => (
                <span
                  key={index}
                  style={{
                    width: `${stat.base_stat}%`,
                    margin: "1rem",
                    color: "white",
                  }}
                  className="progress-bar bg-danger"
                  role="progressbar"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div>
                    <div>
                      <small className="text-capitalise">
                        {stat.stat.name} {stat.base_stat}
                      </small>
                    </div>
                  </div>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className=" m-5 d-flex justify-content-center">
          <Button onClick={() => navigate(-1)}> Back to list</Button>
        </div>
      </div>
    </div>
  );
};

export default PokeSingle;
