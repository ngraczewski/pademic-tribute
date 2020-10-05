import { createReducer } from "@reduxjs/toolkit";
import {
  takeDirectFlight,
  takeCharterFlight,
  buildResearchStation,
  discardCardAction,
  startGame,
  endPlayerCardsPhase,
  endInfectionCardsPhase,
} from "../actions/actions";
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
    .addCase(
      endPlayerCardsPhase,
      (state, { payload: { discardedCards, player, drawnCards } }) => {
        const discardedCardIds = discardedCards.map((c) => c.cardId);
        return {
          ...state,
          list: state.list.map((p) =>
            p.playerName === player.playerName
              ? {
                  ...p,
                  cards: [...p.cards, ...drawnCards]
                    .filter((c) => c.type !== CardType.EPIDEMIC)
                    .filter((c) => !discardedCardIds.includes(c.cardId)),
                }
              : p
          ),
        };
      }
    )
    .addCase(endInfectionCardsPhase, (state) => {
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
