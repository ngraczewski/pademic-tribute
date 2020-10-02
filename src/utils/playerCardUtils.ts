import { PlayerCard } from "../models/PlayerCard";

export const hasCard = (cards: PlayerCard[] | undefined, cardName?: string) =>
  !!cards?.find((card) => card.cardName === cardName);
