import { CityColor } from "./City";

export enum CardType {
  CITY,
  EPIDEMIC,
  EVENT,
}

export enum EventCardType {
  FORECAST,
  ONE_QUIET_NIGHT,
  AIRLIFT,
  RESILIENT_POPULATION,
  COVERNMENT_GRANT,
}

export type CityCard = {
  cardName: string;
  type: CardType.CITY;
  color: CityColor;
};

export type EpidemicCard = {
  cardName: "Epidemic";
  type: CardType.EPIDEMIC;
};

export type EventCard = {
  cardName: string;
  type: CardType.EVENT;
  eventType: EventCardType;
};

export type PlayerCard = CityCard | EpidemicCard | EventCard;
