import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { City } from "../../models/City";
import { currentCharacterSelector } from "./charactersSelectors";
import { uniq } from "lodash";

export const citiesSelector = (state: RootState) => state.cities;

export const citiesMapSelector = createSelector(citiesSelector, (cities) =>
  cities.reduce(
    (citiesMap, city) => {
      citiesMap[city.name] = city;
      return citiesMap;
    },
    {} as {
      [key: string]: City;
    }
  )
);

export const citySelector = (cityName: string) => (state: RootState) =>
  citiesMapSelector(state)[cityName];

export const currentCityNameSelector = createSelector(
  currentCharacterSelector,
  (character) => character?.cityName
);

export const currentCitySelector = createSelector(
  currentCityNameSelector,
  citiesMapSelector,
  (currentCityName, citiesMap) => {
    if (currentCityName) {
      return citiesMap[currentCityName];
    }
  }
);

export const routesSelector = createSelector(citiesSelector, (cities) =>
  uniq(
    cities
      .flatMap((city) =>
        city.neighbours.map((neighbour) =>
          [city.name, neighbour].sort().join("-")
        )
      )
      .sort()
  )
);
