import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { City } from "../../models/City";
import { currentCharacterSelector } from "./charactersSelectors";
import { uniq } from "lodash";

export const citiesDataSelector = (state: RootState) => state.citiesData;

export const citiesSelector = (state: RootState) =>
  citiesDataSelector(state).cities;

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
        city.neighbors.map((neighbour) =>
          [city.name, neighbour].sort().join("-")
        )
      )
      .sort()
  )
);

export const outbreaksSelector = (state: RootState) =>
  citiesDataSelector(state).outbreaks;

export const outbreaksCountSelector = (state: RootState) =>
  outbreaksSelector(state).length;

export const infectionsCountSelector = (
  state: RootState
): {
  red: number;
  black: number;
  blue: number;
  yellow: number;
} =>
  citiesSelector(state).reduce(
    (totalCounts, city) => {
      return {
        red: totalCounts.red + city.diseases.red,
        blue: totalCounts.blue + city.diseases.blue,
        black: totalCounts.black + city.diseases.black,
        yellow: totalCounts.yellow + city.diseases.yellow,
      };
    },
    {
      red: 0,
      blue: 0,
      black: 0,
      yellow: 0,
    }
  );

export const diseaseSpreadTooMuchSelector = createSelector(
  infectionsCountSelector,
  ({ red, blue, black, yellow }) => Math.max(red, blue, black, yellow) > 24
);
