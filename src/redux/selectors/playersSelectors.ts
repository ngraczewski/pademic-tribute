import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Player } from "../../models/Player";

export const hasCardSelector = (cardName: string) =>
  createSelector(
    currentPlayerCardsSelector,
    (cards) => !!cards?.find((card) => card.cardName === cardName)
  );

export const playersSelector = (state: RootState) => state.players.list;

export const playersMapSelector = createSelector(playersSelector, (players): {
  [key: string]: Player;
} =>
  players.reduce(
    (playersMap, player) => {
      playersMap[player.playerName] = player;
      return playersMap;
    },
    {} as {
      [key: string]: Player;
    }
  )
);

export const playerSelector = (playerName: string) => (
  state: RootState
): Player => playersMapSelector(state)[playerName];

export const currentPlayerNameSelector = (
  state: RootState
): string | undefined => state.players.current;

export const currentPlayerSelector = createSelector(
  currentPlayerNameSelector,
  playersMapSelector,
  (currentPlayerName, playersMap) =>
    currentPlayerName ? playersMap[currentPlayerName] : undefined
);

export const currentPlayerCardsSelector = createSelector(
  currentPlayerSelector,
  (player) => player?.cards
);

export const isActivePlayerSelector = (playerName: string) => createSelector(
  currentPlayerNameSelector,
  (currentPlayerName) => currentPlayerName === playerName
)