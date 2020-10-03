import { createReducer } from "@reduxjs/toolkit";
import { max } from "lodash";
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
      (state, { payload: { cityName, disease, infectionsCount } }) =>
        {
          const outbreaks: string[] = [];

          const applyInfection = (cityName: string) => {
            const city = state.find(c => c.name === cityName);
            
            if (!city || outbreaks.includes(cityName)) {
              return;
            }
            
            const currentInfectionCount = city.diseases[disease];
            if (currentInfectionCount + infectionsCount > 3) {
              outbreaks.push(cityName);
              city.neighbours.forEach(applyInfection);
            }

            city.diseases[disease] = Math.min(3, currentInfectionCount + infectionsCount);
          }

          applyInfection(cityName);
          if (outbreaks.length) {

            console.log(outbreaks)
          }
        }
    )
);
