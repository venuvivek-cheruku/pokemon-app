import { Button } from "react-bootstrap";
import React from "react";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { Heart, HeartFill } from 'react-bootstrap-icons';

const PokeCard = ({ name, image, pokemonName, type, fav, favClick  }) => {
  return (
    <Card bg="dark" text="light" key={name}>
      <Card.Header className="d-flex justify-content-between">{name} 
        {fav ? (
          <HeartFill onClick={favClick} color="red" />
        ): (
          <Heart onClick={favClick} color="white" />
        )}
      </Card.Header>
      <Card.Body>
        <Card.Img variant="top" src={image} />
        <LinkContainer to={`/${pokemonName}`}>
          <Button variant="outline-secondary" size='sm'>Details</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default PokeCard;