import { createReducer } from "@reduxjs/toolkit";
import {
  drawPlayerCard,
  takeDirectFlight,
  takeCharterFlight,
  buildResearchStation,
  endTurn,
  discardCardAction,
  startGame,
} from "../actions";
import { Player } from "../../models/Player";
import { CardType } from "../../models/PlayerCard";

type PlayersState = {
  list: Player[];
  current?: string;
};

const initialState: PlayersState = {
  list: [],
};

export const players = createReducer(initialState, (builder) =>
  builder
    .addCase(startGame, (state, { payload: { players } }) => {
      return {
        ...state,
        list: players,
        current: players[0].playerName,
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
    .addCase(discardCardAction, (state, { payload }) => {
      const player = state.list.find((p) => p.playerName === state.current);

      if (player) {
        player.cards = player.cards.filter((c) => c.cardId !== payload.cardId);
      }
    })
);
