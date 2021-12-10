import React from "react";
import { mount, configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import isReact from "is-react";

import HousesConnected, {
  Houses,
  mapDispatchToProps,
  mapStateToProps,
} from "../components/Houses/Houses";
import HouseCard from "../components/HouseCard/HouseCard";
import mainImage from "../img-cp2/main-image-cp2.jpg";
import * as actions from "../redux/actions";
import * as data from "../../db.json";

configure({ adapter: new Adapter() });

describe("<Houses />", () => {
  let houses, store, state, getAllHousesSpy, componentDidMountSpy;

  const mockStore = configureStore([thunk]);
  beforeEach(() => {
    state = {
      houses: [],
      house: {},
    };
    store = mockStore(state);
    houses = mount(<HousesConnected store={store} />);
    // Si o si vas a tener que usar class component! No van a pasar ninguno de los tests si no lo haces.
    expect(isReact.classComponent(Houses)).toBeTruthy();
  });

  it('Debería rederizar un "h1" con el texto "Game of Thrones"', () => {
    expect(houses.find("h1").at(0).text()).toEqual("Game of Thrones");
  });

  it('Debería renderizar en un tag "img" la imagen provista en la carpeta "img-cp2"', () => {
    // Tendrías que importar la img a tu archivo "Houses.jsx" y luego usarla como source de img.
    // Chequeá como lo hacemos en este mismo archivo en la línea 12 ;)
    expect(houses.find("img").at(0).prop("src")).toEqual(mainImage);
  });

  it('La imagen debería tener un atributo "alt" con el texto "main-img"', () => {
    expect(houses.find("img").at(0).prop("alt")).toEqual("main-img");
  });

  it('Debería rederizar un "h3" con el texto "Houses"', () => {
    expect(houses.find("h3").at(0).text()).toEqual("Houses");
  });

  describe("connect Redux", () => {
    it("Debería traer de redux nuestras houses usando mapStateToProps", () => {
      // El estado debería tener un nombre "houses".
      expect(mapStateToProps(state)).toEqual({ houses: state.houses });
    });

    if (typeof mapDispatchToProps === "function") {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UNA FUNCIÓN.
      it("Debería traer por props la funcion getAllHouses de Redux usando mapDispatchToProps", () => {
        // Acá testeamos que hagas todo el proceso. Utilizas la funcion "mapDispatchToProps",
        // y con ella despachas la accion "getAllHouses".
        const getAllHouses = jest.spyOn(actions, "getAllHouses");
        const dispatch = jest.fn();
        const props = mapDispatchToProps(dispatch);
        props.getAllHouses();
        expect(dispatch).toHaveBeenCalled();
        expect(getAllHouses).toHaveBeenCalled();
      });
    } else {
      // ESTE TEST ES POR SI HACES EL MAPDISPATCHTOPROPS COMO UN OBJETO.
      it("Debería traer por props la action creator getAllHouses de Redux usando mapDispatchToProps", () => {
        // Acá testeamos que hagas todo el proceso. Utilizas connect y el objeto "mapDispatchToProps",
        // traes la acción ¨getAllHouses¨. Con esto podrás usarla luego en el componente.
        const getAllHouses = jest.spyOn(actions, "getAllHouses");
        getAllHouses();
        expect(mapDispatchToProps.hasOwnProperty("getAllHouses")).toBeTruthy();
        expect(getAllHouses).toHaveBeenCalled();
      });
    }
  });

  describe("React LifeCycles", () => {
    getAllHousesSpy = jest.fn();
    let instance;
    beforeEach(async () => {
      state = {
        houses: data.houses,
        house: {},
      };
      store = mockStore(state);
      houses = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <HousesConnected />
          </MemoryRouter>
        </Provider>
      );
    });

    beforeAll(() => {
      // Ojo acá. Antes que corran los demás tests, chequeamos que estés usando el lifeCycle correspondiente ( componentDidMount )
      // y que en él ejecutas la action creator "getAllHouses" para traerte toda esa data.
      // Si no pasan estos tests, no pasan los demás!
      componentDidMountSpy = jest.spyOn(Houses.prototype, "componentDidMount");
      instance = shallow(<Houses getAllHouses={getAllHousesSpy} />).instance();

      instance.componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalled();
      expect(getAllHousesSpy).toHaveBeenCalled();
    });

    it("Debería mapear la cantidad de houses que hayan en el store y renderizar una <HouseCard /> por cada una", () => {
      // Cuidado acá. Como realizamos una petición al back (código asincrónico), el componente se va a
      // renderizar más rápido. Hay un problema con esto, se va a intentar renderizar algunos datos que
      // no existen todavía, lo que es igual a un fatal error. Deberías asegurarte que existen las
      // houses y luego renderizarlas!
      // Pista: Usa un renderizado condicional.
      // IMPORTANTE: revisar el código arriba de este test, el beforeAll.
      // Ahí se está testeando el uso del lifecycle componentDidMount y que en él
      // traigas la data a renderizar.
      expect(houses.find(HouseCard)).toHaveLength(3);
    });

    it("Debería pasar como props a cada componente <HouseCard /> las propiedades id, region, name y words de cada house", () => {
      // PASARLE LA PROP keys en el mapeo.
      expect(houses.find(HouseCard).at(0).props().id).toEqual(1);
      expect(houses.find(HouseCard).at(0).props().region).toEqual("The North");
      expect(houses.find(HouseCard).at(0).props().name).toEqual("House Stark");
      expect(houses.find(HouseCard).at(0).props().words).toEqual(
        "Winter Is Coming"
      );
      expect(houses.find(HouseCard).at(0).props().characters.length).toEqual(4);

      expect(houses.find(HouseCard).at(1).props().id).toEqual(2);
      expect(houses.find(HouseCard).at(1).props().region).toEqual("Valyria");
      expect(houses.find(HouseCard).at(1).props().name).toEqual(
        "House Targaryen"
      );
      expect(houses.find(HouseCard).at(1).props().words).toEqual(
        "Fire And Blood"
      );
      expect(houses.find(HouseCard).at(1).props().characters.length).toEqual(1);

      expect(houses.find(HouseCard).at(2).props().id).toEqual(3);
      expect(houses.find(HouseCard).at(2).props().region).toEqual(
        "Westerlands"
      );
      expect(houses.find(HouseCard).at(2).props().name).toEqual(
        "House Lannister"
      );
      expect(houses.find(HouseCard).at(2).props().words).toEqual(
        "Hear Me Roar!"
      );
      expect(houses.find(HouseCard).at(2).props().characters.length).toEqual(3);
    });
  });
});
