import { createReducer } from "@reduxjs/toolkit";
import {
  endInfectionCardsPhase,
  endPlayerCardsPhase,
  playEpidemicCard,
  startGame,
} from "../actions/actions";

export const events = createReducer([] as string[][], (builder) =>
  builder
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
    .addCase(
      endPlayerCardsPhase,
      (state, { payload: { player, discardedCards, drawnCards } }) => {
        return [
          [
            `Player ${player.playerName} drawn`,
            ...drawnCards.map((c) => c.cardName),
            ...(discardedCards.length
              ? [`and discarded`, ...discardedCards.map((c) => c.cardName)]
              : []),
          ],
          ...state,
        ];
      }
    )
    .addCase(
      endInfectionCardsPhase,
      (state, { payload: { infectionCards } }) => {
        return [
          ["Infection cards drawn", ...infectionCards.map((c) => c.cardName)],
          ...state,
        ];
      }
    )
    .addCase(playEpidemicCard, (state, { payload: { infectionCard } }) => {
      return [
        ["Epidemic", `Infected city: ${infectionCard.cardName}`],
        ...state,
      ];
    })
);
