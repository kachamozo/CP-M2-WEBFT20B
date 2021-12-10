// Importa las actions types que necesites acá:
import {
  GET_ALL_HOUSES,
  CREATE_HOUSE,
  GET_HOUSE,
  DELETE_HOUSE,
} from "../actions";

const initialState = {
  houses: [],
  house: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código:
    case GET_ALL_HOUSES:
      return {
        ...state,
        houses: action.payload,
      };

    case GET_HOUSE:
      return {
        ...state,
        house: action.payload,
      };

    case CREATE_HOUSE:
      return {
        ...state,
        houses: [...state.houses, action.payload],
      };

    case DELETE_HOUSE:
      const result = state.houses.filter((e) => e.id !== action.payload);
      return {
        ...state,
        houses: result,
      };

    default:
      return state;
  }
};

export default rootReducer;
