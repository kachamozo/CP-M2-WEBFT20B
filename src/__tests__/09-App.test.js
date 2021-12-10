import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import * as data from "../../db.json";
import App from "../App";
import Nav from "../components/Nav/Nav";
import Houses from "../components/Houses/Houses";
import HouseDetail from "../components/HouseDetail/HouseDetail";
import CreateHouse from "../components/CreateHouse/CreateHouse";

configure({ adapter: new Adapter() });

describe("<App />", () => {
  let store;
  const routes = ["/", "/otraRuta", "/houses", "/houses/:1", "/house/create"];
  const mockStore = configureStore([thunk]);
  const state = {
    houses: data.houses,
    house: data.houses[0],
  };

  beforeEach(() => {
    store = mockStore(state);
  });

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  describe("El componente Nav debe ser renderizado en todas las rutas", () => {
    it('Debería ser renderizado en la ruta "/"', () => {
      const app = mount(componentToUse(routes[0]));
      expect(app.find(Nav)).toHaveLength(1);
    });

    it('Debería ser renderizado en la ruta "/otraRuta"', () => {
      const app = mount(componentToUse(routes[1]));
      expect(app.find(Nav)).toHaveLength(1);
    });
  });

  it('El componente "Houses" se debería renderizar solamente en la ruta "/"', () => {
    const app = mount(componentToUse(routes[0]));
    expect(app.find(Houses)).toHaveLength(1);
    expect(app.find(Nav)).toHaveLength(1);
  });

  it('El componente "HouseDetail" se debería renderizar solamente en la ruta "/houses/:houseId"', () => {
    const app = mount(componentToUse(routes[3]));
    expect(app.find(HouseDetail)).toHaveLength(1);
    expect(app.find(Houses)).toHaveLength(0);
    expect(app.find(Nav)).toHaveLength(1);
  });

  it('El componente "CreateHouse" se debería renderizar solamente en la ruta "/house/create"', () => {
    const app = mount(componentToUse(routes[4]));
    expect(app.find(CreateHouse)).toHaveLength(1);
    expect(app.find(Houses)).toHaveLength(0);
    expect(app.find(Nav)).toHaveLength(1);
  });
});
