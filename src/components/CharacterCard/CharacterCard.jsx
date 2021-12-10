import React from "react";

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
const CharacterCard = (props) => {
  return (
    <div>
      <img src={props.imageUrl} alt="personaje" />
      <p>ID: {props.id}</p>
      <p>Name: {props.fullName}</p>
      <p>Title: {props.title}</p>
      <p>Family: {props.family}</p>
    </div>
  );
};

export default CharacterCard;
