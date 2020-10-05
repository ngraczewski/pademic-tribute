import { InfectionCard } from "../../models/InfectionCard";
import { infectionCardsData } from "../../data/infectionCards";
import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { shuffle } from "lodash";
import { playEpidemicCard } from "../actions/actions";

export type InfectionCardsState = {
  deck: InfectionCard[];
  discarded: InfectionCard[];
};

export type DrawInfectionCardsAction = {
  type: string;
  payload: {
    infectionCards: InfectionCard[];
  };
};

export const initialState: InfectionCardsState = {
  deck: shuffle(infectionCardsData),
  discarded: [],
};

export const isDrawInfectionCardAction = (
  action: AnyAction
): action is DrawInfectionCardsAction =>
  !!(action as DrawInfectionCardsAction).payload?.infectionCards;

export const infectionCards = createReducer(initialState, (builder) =>
  builder
    .addCase(playEpidemicCard, (state, { payload: { infectionCard } }) => {
      return {
        ...state,
        deck: [
          ...shuffle([infectionCard, ...state.discarded]),
          ...state.deck.filter((c) => c.cardName !== infectionCard.cardName),
        ],
        discarded: [],
      };
    })
    .addMatcher(
      isDrawInfectionCardAction,
      (state, { payload: { infectionCards } }) => {
        const infectedCities = infectionCards.map((c) => c.cardName);

        return {
          ...state,
          deck: state.deck.filter((c) => !infectedCities.includes(c.cardName)),
          discarded: [...state.discarded, ...infectionCards],
        };
      }
    )
);
