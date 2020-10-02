import {
  PlayerCard,
  CardType,
  CityCard,
  EpidemicCard,
} from "../models/PlayerCard";
import { citiesData } from "./cities";
import { range } from "lodash";

let cardId = 0;

export const playerCardsData: PlayerCard[] = [
  ...citiesData.map(
    (c) =>
      ({
        id: cardId++,
        cardName: c.name,
        type: CardType.CITY,
        color: c.color,
      } as CityCard)
  ),
  ...range(0, 6).map(
    () =>
      ({
        id: cardId++,
        cardName: "Epidemic",
        type: CardType.EPIDEMIC,
      } as EpidemicCard)
  ),
  //   {
  //     id: cardId++,
  //     cardName: "Forecast",
  //     type: CardType.EVENT,
  //     eventType: EventCardType.FORECAST,
  //   },
  //   {
  //     id: cardId++,
  //     cardName: "One Quiet Night",
  //     type: CardType.EVENT,
  //     eventType: EventCardType.ONE_QUIET_NIGHT,
  //   },
  //   {
  //     id: cardId++,
  //     cardName: "Resilient Population",
  //     type: CardType.EVENT,
  //     eventType: EventCardType.RESILIENT_POPULATION,
  //   },
  //   {
  //     id: cardId++,
  //     cardName: "Government Grant",
  //     type: CardType.EVENT,
  //     eventType: EventCardType.COVERNMENT_GRANT,
  //   },
  //   {
  //     id: cardId++,
  //     cardName: "Airlift",
  //     type: CardType.EVENT,
  //     eventType: EventCardType.AIRLIFT,
  //   },
];
