import { createReducer } from "@reduxjs/toolkit";
import { playerCardsData } from "../../data/playerCards";
import { endPlayerCardsPhase, startGame } from "../actions/actions";
import { shuffle, chunk } from "lodash";
import { CardType } from "../../models/PlayerCard";

export const playerCards = createReducer(shuffle(playerCardsData), (builder) =>
  builder
    .addCase(endPlayerCardsPhase, (state, { payload: { drawnCards } }) => {
      const drawnCardIds = drawnCards.map((c) => c.cardId);
      return state.filter((c) => !drawnCardIds.includes(c.cardId));
    })
    .addCase(startGame, (state, { payload: { epidemicsCount, players } }) => {
      const playerCardIds = players[0].cards.map((c) => c.cardId);

      const cards = state.filter((c) => !playerCardIds.includes(c.cardId));

      const chunks = chunk(cards, Math.ceil(cards.length / epidemicsCount));

      let cardId = 100;
      return chunks.flatMap((c) =>
        shuffle([
          ...c,
          {
            cardId: cardId++,
            cardName: "Epidemic",
            type: CardType.EPIDEMIC,
          },
        ])
      );
    })
);
