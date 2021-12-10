import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";

import HouseCardConnected, {
  HouseCard,
  mapDispatchToProps,
} from "../components/HouseCard/HouseCard";
import * as actions from "../redux/actions";
import * as data from "../../db.json";

configure({ adapter: new Adapter() });

xdescribe("<HouseCard />", () => {
  const { DELETE_HOUSE } = actions;
  let houseCard, state, store, houses;
  const mockStore = configureStore([thunk]);
  houses = data.houses;
  state = {
    houses: [],
    house: {},
  };
  store = mockStore(state);
  // Si o si vas a tener que usar class component! No van a correr ninguno de los tests si no lo haces. <3
  beforeEach(() => {
    houseCard = (house) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <HouseCardConnected
              id={house.id}
              region={house.region}
              name={house.name}
              words={house.words}
            />
          </MemoryRouter>
        </Provider>
      );
    expect(isReact.classComponent(HouseCard)).toBeTruthy();
  });

  afterEach(() => jest.restoreAllMocks());

  xdescribe("Estructura", () => {
    it('Debería renderizar un "button"', () => {
      expect(houseCard(houses[0]).find("button")).toHaveLength(1);
    });

    it('Debería renderizar un tag "h3" que muestre lo que contiene el "name" de cada "House"', () => {
      expect(houseCard(houses[0]).find("h3").at(0).text()).toBe("House Stark");
      expect(houseCard(houses[1]).find("h3").at(0).text()).toBe(
        "House Targaryen"
      );
      expect(houseCard(houses[2]).find("h3").at(0).text()).toBe(
        "House Lannister"
      );
    });

    it('Debería renderizar un "p" que contenga el texto "Region: " más la region de cada "House"', () => {
      expect(houseCard(houses[0]).find("p").at(0).text()).toBe(
        "Region: The North"
      );
      expect(houseCard(houses[1]).find("p").at(0).text()).toBe(
        "Region: Valyria"
      );
      expect(houseCard(houses[2]).find("p").at(0).text()).toBe(
        "Region: Westerlands"
      );
    });

    it('Debería renderizar un "p" que contenga el texto "Words: " más la prop "words" de cada "House"', () => {
      expect(houseCard(houses[0]).find("p").at(1).text()).toBe(
        "Words: Winter Is Coming"
      );
      expect(houseCard(houses[1]).find("p").at(1).text()).toBe(
        "Words: Fire And Blood"
      );
      expect(houseCard(houses[2]).find("p").at(1).text()).toBe(
        "Words: Hear Me Roar!"
      );
    });

    it('Debería renderizar un componente <Link> que encierre el "name" de cada "House" y debería redirigir a "/houses/:houseId"', () => {
      // El valor de "houseId" lo tenes que sacar del objeto house, tiene una propiedad "id".
      expect(houseCard(houses[0]).find(Link)).toHaveLength(1);
      expect(houseCard(houses[0]).find(Link).at(0).prop("to")).toEqual(
        "/houses/1"
      );
    });
  });

  xdescribe("connect redux", () => {
    if (typeof mapDispatchToProps === "function") {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UNA FUNCIÓN.
      it("Debería traer por props la funcion deleteHouse de Redux usando mapDispatchToProps", () => {
        // Usamos "mapDispatchToProps", pasamos a props la funcion deleteHouse.
        // Se debe llamar exactamente igual!
        const deleteHouseSpy = jest.spyOn(actions, "deleteHouse");
        expect(mapDispatchToProps.hasOwnProperty("deleteHouse")).toBeTruthy();
        mapDispatchToProps.deleteHouse = deleteHouseSpy;
        mapDispatchToProps.deleteHouse(1);
        expect(deleteHouseSpy).toHaveBeenCalled();
      });
    } else {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UN OBJETO.
      it("Debería traer por props la action creator deleteHouse de Redux usando mapDispatchToProps", () => {
        // Acá testeamos que hagas todo el proceso. Utilizas connect y el objeto "mapDispatchToProps",
        // traes la acción 'deleteHouse' y la despachas.
        const deleteHouseSpy = jest.spyOn(actions, "deleteHouse");
        deleteHouseSpy(1);
        expect(mapDispatchToProps.hasOwnProperty("deleteHouse")).toBeTruthy();
        expect(deleteHouseSpy).toHaveBeenCalled();
      });
    }
  });

  xdescribe("Dispatch to store", () => {
    it('Debería hacer un dispatch al store utilizando la action "deleteHouse" al hacer click en el boton previamente creado. Debe pasarle el Id de la house', () => {
      expect(mapDispatchToProps.hasOwnProperty("deleteHouse")).toBeTruthy();
      mapDispatchToProps.deleteHouse = actions.deleteHouse;
      houseCard(houses[0]).find("button").simulate("click");
      expect(store.getActions()).toEqual([{ type: DELETE_HOUSE, payload: 1 }]);
    });
  });
});
