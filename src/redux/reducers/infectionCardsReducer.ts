import { InfectionCard } from "../../models/InfectionCard";
import { infectionCardsData } from "../../data/infectionCards";
import { createReducer } from "@reduxjs/toolkit";
import { shuffle } from "lodash";
import { drawInfectionCard } from "../actions";

export type InfectionCardsState = {
  deck: InfectionCard[];
  discarded: InfectionCard[];
};

export const initialState: InfectionCardsState = {
  deck: shuffle(infectionCardsData),
  discarded: [],
};

export const infectionCards = createReducer(initialState, (builder) =>
  builder.addCase(drawInfectionCard, (state, { payload: { card } }) => ({
    ...state,
    deck: state.deck.filter((c) => c.cardName !== card.cardName),
    discarded: [...state.discarded, card],
  }))
);
