import React from "react";
import { useDispatch } from "react-redux";
import { createHouse } from "../../redux/actions";

// CUIDADOOOO. SI O SI FUNCTIONAL COMPONENT! SE ROMPEN LOS TEST EN CASO CONTRARIO!!
// TAMBIEN VAS A TENER QUE USAR HOOKS!
// Recordar que los hooks de React deben utilizarse de la forma "React.useState", "React.useEffect", etc.
// Los tests no van a reconocer la ejecución haciendo destructuring de estos métodos.
const CreateHouse = () => {
  const [house, setHouse] = React.useState({
    name: "",
    region: "",
    words: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setHouse({ ...house, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHouse(house));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <p>
        <label>Name: </label>
        <input type="text" name="name" onChange={(e) => handleChange(e)} />
      </p>
      <p>
        <label>Region: </label>
        <input type="text" name="region" onChange={(e) => handleChange(e)} />
      </p>
      <p>
        <label>Words: </label>
        <input type="text" name="words" onChange={(e) => handleChange(e)} />
      </p>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateHouse;
