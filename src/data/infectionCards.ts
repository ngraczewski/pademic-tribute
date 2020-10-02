import { InfectionCard } from "../models/InfectionCard";
import { citiesData } from "./cities";

export const infectionCardsData: InfectionCard[] = citiesData.map((c) => ({
  cardName: c.name,
  disease: c.color,
}));
