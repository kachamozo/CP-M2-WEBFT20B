import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";

import * as data from "../../db.json";
import CharacterCard from "../components/CharacterCard/CharacterCard";

configure({ adapter: new Adapter() });

xdescribe("<CharacterCard />", () => {
  let characterCard;
  let [char1, char2, char3] = data.houses[0].characters;

  // Si o si vas a tener que usar functional component! No van a correr ninguno de los tests si no lo haces!
  beforeEach(() => {
    characterCard = (character) =>
      shallow(
        <CharacterCard
          key={character.id}
          id={character.id}
          fullName={character.fullName}
          title={character.title}
          family={character.family}
          imageUrl={character.imageUrl}
          houseId={character.houseId}
        />
      );
    expect(isReact.classComponent(CharacterCard)).toBeFalsy();
  });

  it('Debería renderizar un tag "img" y utilizar como source la imagen del personaje', () => {
    expect(characterCard(char1).find("img").at(0).prop("src")).toEqual(
      char1.imageUrl
    );
    expect(characterCard(char2).find("img").at(0).prop("src")).toEqual(
      char2.imageUrl
    );
    expect(characterCard(char3).find("img").at(0).prop("src")).toEqual(
      char3.imageUrl
    );
  });

  it('Debería renderizar un "p" que contenga el texto "ID: " más el id del personaje', () => {
    expect(characterCard(char1).find("p").at(0).text()).toBe(`ID: ${char1.id}`);
    expect(characterCard(char2).find("p").at(0).text()).toBe(`ID: ${char2.id}`);
    expect(characterCard(char3).find("p").at(0).text()).toBe(`ID: ${char3.id}`);
  });

  it('Debería renderizar un "p" que contenga el texto "Name: " más el nombre completo del personaje', () => {
    expect(characterCard(char1).find("p").at(1).text()).toBe(
      `Name: ${char1.fullName}`
    );
    expect(characterCard(char2).find("p").at(1).text()).toBe(
      `Name: ${char2.fullName}`
    );
    expect(characterCard(char3).find("p").at(1).text()).toBe(
      `Name: ${char3.fullName}`
    );
  });

  it('Debería renderizar un "p" que contenga el texto "Title: " más el titulo del personaje', () => {
    expect(characterCard(char1).find("p").at(2).text()).toBe(
      `Title: ${char1.title}`
    );
    expect(characterCard(char2).find("p").at(2).text()).toBe(
      `Title: ${char2.title}`
    );
    expect(characterCard(char3).find("p").at(2).text()).toBe(
      `Title: ${char3.title}`
    );
  });

  it('Debería renderizar un "p" que contenga el texto "Family: " más la familia del personaje', () => {
    expect(characterCard(char1).find("p").at(3).text()).toBe(
      `Family: ${char1.family}`
    );
    expect(characterCard(char2).find("p").at(3).text()).toBe(
      `Family: ${char2.family}`
    );
    expect(characterCard(char3).find("p").at(3).text()).toBe(
      `Family: ${char3.family}`
    );
  });
});
