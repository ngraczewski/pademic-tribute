import { createReducer } from "@reduxjs/toolkit";
import { playEpidemicCard } from "../actions/actions";

export const infectionRates = [2, 2, 2, 3, 3, 4, 4];

export const infectionRate = createReducer(0, (builder) =>
  builder.addCase(playEpidemicCard, (state) => state + 1)
);
