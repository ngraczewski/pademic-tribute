import { createReducer } from "@reduxjs/toolkit";
import {
  addPlayer,
  drawCard,
  directFlight,
  charterFlight,
  buildResearchStation,
} from "./actions";
import { Player } from "../models/Player";

type State = {
  list: Player[];
  current?: string;
};

const intitialState: State = {
  list: [],
};

export const players = createReducer(intitialState, (builder) =>
  builder
    .addCase(addPlayer, (state, { payload }) => {
      const newPlayer: Player = {
        cards: [],
        characterName: payload.characterName,
        playerName: payload.playerName,
      };

      return {
        ...state,
        list: [...state.list, newPlayer],
        current: state.current ?? newPlayer?.playerName,
      };
    })
    .addCase(drawCard, (state, { payload: { card, playerName } }) => ({
      ...state,
      list: state.list.map((p) =>
        p.playerName === playerName
          ? {
              ...p,
              cards: [...p.cards, card],
            }
          : p
      ),
    }))
    .addCase(
      directFlight,
      (state, { payload: { playerName, targetCityName } }) => ({
        ...state,
        list: state.list.map((p) =>
          p.playerName === playerName
            ? {
                ...p,
                cards: p.cards.filter((c) => c.cardName !== targetCityName),
              }
            : p
        ),
      })
    )
    .addCase(
      charterFlight,
      (state, { payload: { playerName, originCityName } }) => ({
        ...state,
        list: state.list.map((p) =>
          p.playerName === playerName
            ? {
                ...p,
                cards: p.cards.filter((c) => c.cardName !== originCityName),
              }
            : p
        ),
      })
    )
    .addCase(
      buildResearchStation,
      (state, { payload: { playerName, cityName } }) => ({
        ...state,
        list: state.list.map((p) =>
          p.playerName === playerName
            ? {
                ...p,
                cards: p.cards.filter((c) => c.cardName !== cityName),
              }
            : p
        ),
      })
    )
);
