import { RootState } from "../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { City } from "../models/City";

export const actionsCountSelector = (state: RootState): number =>
  state.actions.count;

export const totalActionsCountSelector = (state: RootState): number =>
  state.actions.total;

export const citiesSelector = (state: RootState) => state.cities;

export const citiesMapSelector = createSelector(citiesSelector, (cities): {
  [key: string]: City;
} =>
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

export const citySelector = (cityName: string) => (state: RootState): City =>
  citiesMapSelector(state)[cityName];
