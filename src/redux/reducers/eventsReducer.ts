import { createReducer } from "@reduxjs/toolkit";
import { drawInfectionCard, drawPlayerCard, startGame } from "../actions";

export const events = createReducer([] as string[][], (builder) =>
  builder
    .addCase(drawInfectionCard, (state, { payload: { card } }) => {
      return [[`Drawn infection card ${card.cardName}`], ...state];
    })
    .addCase(drawPlayerCard, (state, { payload: { card } }) => {
      return [[`Drawn player card ${card.cardName}`], ...state];
    })
    .addCase(
      startGame,
      (state, { payload: { epidemicsCount, infectionCards, players } }) => {
        return [
          [
            `Game started with:`,
            `${players.length} players:`,
            ...players.map((p) => p.playerName),
            `${epidemicsCount} epidemic cards`,
            "Infected cities:",
            ...infectionCards.map((c) => c.cardName),
          ],
          ...state,
        ];
      }
    )
);
