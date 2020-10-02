import { createReducer } from "@reduxjs/toolkit";
import { citiesData } from "../../data/cities";
import {
  buildResearchStation,
  treatDisease,
  setCityPosition,
  infectCity,
} from "../actions";

export const cities = createReducer(citiesData, (builder) =>
  builder
    .addCase(buildResearchStation, (state, { payload: { cityName } }) =>
      state.map((city) =>
        city.name === cityName
          ? {
              ...city,
              hasResearchStation: true,
            }
          : city
      )
    )
    .addCase(
      treatDisease,
      (state, { payload: { cityName, casCure, disease } }) =>
        state.map((city) =>
          city.name === cityName
            ? {
                ...city,
                diseases: {
                  ...city.diseases,
                  [disease]: casCure ? 0 : city.diseases[disease] - 1,
                },
              }
            : city
        )
    )
    .addCase(setCityPosition, (state, { payload: { cityName, position } }) =>
      state.map((city) =>
        city.name === cityName
          ? {
              ...city,
              position,
            }
          : city
      )
    )
    .addCase(
      infectCity,
      (state, { payload: { cityName, disease, infectionsCount } }) => {
        console.log(cityName, disease, infectionsCount);
        return state.map((c) =>
          c.name === cityName
            ? {
                ...c,
                diseases: {
                  ...c.diseases,
                  [disease]: c.diseases[disease] + infectionsCount,
                },
              }
            : c
        );
      }
    )
);
