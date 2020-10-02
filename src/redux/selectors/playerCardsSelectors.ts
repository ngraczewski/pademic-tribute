import { RootState } from "../../app/store";
import { PlayerCard, CardType } from "../../models/PlayerCard";
import { createSelector } from "@reduxjs/toolkit";

export const playerCardsSelector = (state: RootState): PlayerCard[] =>
  state.playerCards;

export const nonEpidemicPlayerCardsSelector = createSelector(
  playerCardsSelector,
  (cards) => cards.filter((c) => c.type !== CardType.EPIDEMIC)
);
