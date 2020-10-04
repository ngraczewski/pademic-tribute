import { createReducer } from "@reduxjs/toolkit";
import { citiesData as cities } from "../../data/cities";
import { City, CityName } from "../../models/City";
import {
  buildResearchStation,
  treatDisease,
  setCityPosition,
  infectCity,
  startGame,
} from "../actions";

export type CitiesDataState = {
  cities: City[];
  outbreaks: CityName[];
};

export const initialState: CitiesDataState = {
  cities,
  outbreaks: [],
};

export const citiesData = createReducer(initialState, (builder) =>
  builder
    .addCase(buildResearchStation, (state, { payload: { cityName } }) => ({
      ...state,
      cities: state.cities.map((city) =>
        city.name === cityName
          ? {
              ...city,
              hasResearchStation: true,
            }
          : city
      ),
    }))
    .addCase(
      treatDisease,
      (state, { payload: { cityName, casCure, disease } }) => ({
        ...state,
        cities: state.cities.map((city) =>
          city.name === cityName
            ? {
                ...city,
                diseases: {
                  ...city.diseases,
                  [disease]: casCure ? 0 : city.diseases[disease] - 1,
                },
              }
            : city
        ),
      })
    )
    .addCase(setCityPosition, (state, { payload: { cityName, position } }) => ({
      ...state,
      cities: state.cities.map((city) =>
        city.name === cityName
          ? {
              ...city,
              position,
            }
          : city
      ),
    }))
    .addCase(startGame, (state, { payload: { infectionCards } }) => {
      const cityNames = infectionCards.map((c) => c.cardName);
      return {
        ...state,
        cities: state.cities.map((city) =>
          cityNames.includes(city.name)
            ? {
                ...city,
                diseases: {
                  ...city.diseases,
                  [city.color]:
                    1 + Math.floor(cityNames.indexOf(city.name) / 3),
                },
              }
            : city
        ),
      };
    })
    .addCase(
      infectCity,
      (state, { payload: { cityName, disease, infectionsCount } }) => {
        const outbreaks: CityName[] = [];

        const applyInfection = (
          cityName: CityName,
          infectionsCount: number
        ) => {
          const city = state.cities.find((c) => c.name === cityName);

          if (!city) {
            return;
          }

          const currentInfectionCount = city.diseases[disease];
          if (
            currentInfectionCount + infectionsCount > 3 &&
            !outbreaks.includes(cityName)
          ) {
            outbreaks.push(cityName);
            city.neighbors.forEach((n) => applyInfection(n, 1));
          }

          city.diseases[disease] = Math.min(
            3,
            currentInfectionCount + infectionsCount
          );
        };

        applyInfection(cityName, infectionsCount);

        if (outbreaks.length) {
          console.log(outbreaks);
        }
        state.outbreaks = [...state.outbreaks, ...outbreaks];
      }
    )
);
