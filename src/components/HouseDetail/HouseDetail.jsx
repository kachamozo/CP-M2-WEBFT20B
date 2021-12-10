/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHouse } from "../../redux/actions";
import CharacterCard from "../CharacterCard/CharacterCard";

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR HOOKS!
const HouseDetail = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const id = props.match.params.houseId;
    dispatch(getHouse(id));
  }, []);

  const house = useSelector((state) => state.house);
  console.log(house);

  return (
    <div>
      <h1>{house.name}</h1>
      <h2>{house.words}</h2>
      {house.characters?.map((c) => (
        <CharacterCard
          key={c.id}
          id={c.id}
          fullName={c.fullName}
          title={c.title}
          family={c.family}
          imageUrl={c.imageUrl}
          houseId={c.houseId}
        />
      ))}
    </div>
  );
};

export default HouseDetail;
