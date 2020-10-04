import { createReducer } from "@reduxjs/toolkit";
import { playerCardsData } from "../../data/playerCards";
import { drawPlayerCard, startGame } from "../actions";
import { shuffle, chunk } from "lodash";
import { CardType } from "../../models/PlayerCard";

export const playerCards = createReducer(shuffle(playerCardsData), (builder) =>
  builder
    .addCase(drawPlayerCard, (state, { payload: { card } }) =>
      state.filter((c) => c.cardId !== card.cardId)
    )
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
