import { createReducer } from "@reduxjs/toolkit";
import {
  addPlayer,
  drawCard,
  takeDirectFlight,
  takeCharterFlight,
  buildResearchStation,
  endTurnAction,
} from "../actions";
import { Player } from "../../models/Player";

type PlayersState = {
  list: Player[];
  current?: string;
};

const intitialState: PlayersState = {
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
      takeDirectFlight,
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
      takeCharterFlight,
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
    .addCase(endTurnAction, (state) => {
      const currentPlayerName = state.current;
      const currentPlayer = state.list.find(
        (p) => p.playerName === currentPlayerName
      );

      if (!currentPlayer) {
        return state;
      }

      const currentPlayerIndex = state.list.indexOf(currentPlayer);
      const nextPlayerIndex = (currentPlayerIndex + 1) % state.list.length;

      return {
        ...state,
        current: state.list[nextPlayerIndex].playerName,
      };
    })
);
