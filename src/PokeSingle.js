import React,{ useEffect, useState }  from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { Button } from "react-bootstrap";

const PokeSingle = () => {
    let { pokemonName } = useParams();
    let navigate = useNavigate();
    const [poke, setPoke] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .catch((error) => {
            console.log(error);
        })
        .then((res) => {
            setPoke(res.data);
            setIsLoading(false);
        });
    }, [])



    return (
        <div>
            {isLoading && <Loader />}
            {!isLoading && (
                <div>
                    <p><strong>{poke.name}</strong></p>
                    <img src={poke.sprites.other.dream_world.front_default} alt={poke.name}/>
                    <p>Base experience: {poke.base_experience}</p>
                    <p>Height: {poke.height}</p>
                    <p>Weigth: {poke.weight}</p> 
                    <div>Types: {" "}
                        <ul>
                            {poke.types.map(item => {
                                <li key={item.type.name}>{item.type.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            )}
            <Button onClick={() => navigate(-1)} > Back to list</Button>
        </div>
    );
};

export default PokeSingle;