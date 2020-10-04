import { PlayerCard, CardType, CityCard } from "../models/PlayerCard";
import { citiesData } from "./cities";

let cardId = 0;

export const playerCardsData: PlayerCard[] = [
  ...citiesData.map(
    (c) =>
      ({
        cardId: cardId++,
        cardName: c.name,
        type: CardType.CITY,
        color: c.color,
      } as CityCard)
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
