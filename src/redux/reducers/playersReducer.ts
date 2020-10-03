import { createReducer } from "@reduxjs/toolkit";
import {
  addPlayer,
  drawPlayerCard,
  takeDirectFlight,
  takeCharterFlight,
  buildResearchStation,
  endTurn,
} from "../actions";
import { Player } from "../../models/Player";
import { CardType } from "../../models/PlayerCard";

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
    .addCase(drawPlayerCard, (state, { payload: { card, playerName } }) => {
      if (card.type === CardType.EPIDEMIC) {
        return state;
      }

      return {
        ...state,
        list: state.list.map((p) =>
          p.playerName === playerName
            ? {
                ...p,
                cards: [...p.cards, card],
              }
            : p
        ),
      };
    })
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
    .addCase(endTurn, (state) => {
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
