import { createReducer } from "@reduxjs/toolkit";
import { playerCardsData } from "../../data/playerCards";
import { drawPlayerCard, shuffleEpidemicsIn } from "../actions";
import { shuffle, chunk } from "lodash";
import { CardType, EpidemicCard } from "../../models/PlayerCard";

export const playerCards = createReducer(playerCardsData, (builder) =>
  builder
    .addCase(drawPlayerCard, (state, { payload: { card } }) =>
      state.filter((c) => c.cardId !== card.cardId)
    )
    .addCase(shuffleEpidemicsIn, (state, { payload: { epidemicsCount } }) => {
      const shuffled = shuffle(state);
      const chunks = chunk(
        shuffled,
        Math.ceil(shuffled.length / epidemicsCount)
      );

      let cardId = 100;
      return chunks.flatMap((c) =>
        shuffle([
          ...c,
          {
            cardId: cardId++,
            cardName: "Epidemic",
            type: CardType.EPIDEMIC,
          } as EpidemicCard,
        ])
      );
    })
);
