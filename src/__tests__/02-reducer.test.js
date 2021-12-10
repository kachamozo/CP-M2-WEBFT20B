import rootReducer from "../redux/reducer";
import {
  createHouse,
  deleteHouse,
  GET_ALL_HOUSES,
  GET_HOUSE,
} from "../redux/actions";
import * as data from "../../db.json";

describe("Reducer", () => {
  const state = {
    houses: [],
    house: {},
  };

  it("Debería retornar el estado inicial si no se pasa un type válido", () => {
    expect(rootReducer(undefined, [])).toEqual({ houses: [], house: {} });
  });

  it('Debería guardar en nuestro state las houses obtenidas de nuestro llamado al back cuando action type es "GET_ALL_HOUSES"', () => {
    const result = rootReducer(state, {
      type: GET_ALL_HOUSES,
      payload: data.houses,
    });
    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      houses: data.houses, // Cuando ejecutes los tests, vas a ver bien lo que espera que le llegue!
      house: {},
    });
  });

  it('Debería guardar en nuestro state la house obtenida de nuestro llamado al back cuando action type es "GET_HOUSE"', () => {
    const result = rootReducer(state, {
      type: GET_HOUSE,
      payload: data.houses[0],
    });
    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      houses: [],
      house: data.houses[0],
    });
  });

  it('Debería crear una nueva house y guardarla en nuestro reducer cuando action type es "CREATE_HOUSE"', () => {
    const state = {
      houses: data.houses,
      house: {},
    };

    const payload1 = {
      name: "House Baratheon",
      region: "Stormlands",
      words: "Ours is the Fury",
    };

    const payload2 = {
      name: "House Arryn",
      region: "The Vale of Arryn",
      words: "As High as Honor",
    };

    const houses1 = [
      ...data.houses,
      {
        id: 4,
        name: "House Baratheon",
        region: "Stormlands",
        words: "Ours is the Fury",
      },
    ];
    const houses2 = [
      ...houses1,
      {
        id: 5,
        name: "House Arryn",
        region: "The Vale of Arryn",
        words: "As High as Honor",
      },
    ];
    const result1 = rootReducer(state, createHouse(payload1));
    const result2 = rootReducer(
      { ...state, houses: houses1 },
      createHouse(payload2)
    );

    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result1).not.toEqual(state);
    expect(result2).not.toEqual(state);

    expect(result1).toEqual({ house: {}, houses: houses1 });
    expect(result2).toEqual({ house: {}, houses: houses2 });
  });

  it('Debería eliminar una house de nuestro store cuando action type es "DELETE_HOUSE"', () => {
    const state = {
      houses: data.houses,
      house: {},
    };

    const houses1 = [data.houses[1], data.houses[2]];
    const houses2 = [data.houses[0], data.houses[1]];
    const result1 = rootReducer(state, deleteHouse(1));
    const result2 = rootReducer(state, deleteHouse(3));

    // Ojooo. Recodar que no debemos mutar nuestro state!
    expect(result1).not.toEqual(state);
    expect(result2).not.toEqual(state);

    expect(result1).toEqual({ house: {}, houses: houses1 });
    expect(result2).toEqual({ house: {}, houses: houses2 });
  });
});
