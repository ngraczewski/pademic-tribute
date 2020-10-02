import { RootState } from "../../app/store";

export const infectionCardsStateSelector = (state: RootState) =>
  state.infectionCards;

export const infectionCardsSelector = (state: RootState) =>
  infectionCardsStateSelector(state).deck;
