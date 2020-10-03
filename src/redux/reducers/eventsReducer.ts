import { createReducer } from "@reduxjs/toolkit";
import { drawInfectionCard, drawPlayerCard } from "../actions";

export const events = createReducer([] as string[], (builder) =>
  builder
    .addCase(drawInfectionCard, (state, { payload: { card } }) => {
      return [`Drawn infection card ${card.cardName}`, ...state];
    })
    .addCase(drawPlayerCard, (state, { payload: { card } }) => {
      return [`Drawn player card ${card.cardName}`, ...state];
    })
);
