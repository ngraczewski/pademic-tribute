import { createReducer } from "@reduxjs/toolkit";
import { playerCardsData } from "../../data/playerCards";
import { drawCard, shuffleEpidemicsIn } from "../actions";
import { shuffle, chunk } from "lodash";
import { CardType, EpidemicCard } from "../../models/PlayerCard";

export const playerCards = createReducer(playerCardsData, (builder) =>
  builder
    .addCase(drawCard, (state, { payload: { card } }) =>
      state.filter((c) => c.cardName !== card.cardName)
    )
    .addCase(shuffleEpidemicsIn, (state, { payload: { epidemicsCount } }) => {
      const shuffled = shuffle(state);
      const chunks = chunk(
        shuffled,
        Math.ceil(shuffled.length / epidemicsCount)
      );

      console.log(Math.ceil(shuffled.length / epidemicsCount));
      console.log(chunks);

      return chunks.flatMap((c) =>
        shuffle([
          ...c,
          {
            cardName: "Epidemic",
            type: CardType.EPIDEMIC,
          } as EpidemicCard,
        ])
      );
    })
);
