import { createAction } from "@reduxjs/toolkit";
import { City, CityName } from "../../models/City";
import { PlayerCard } from "../../models/PlayerCard";
import { Position } from "../../models/Position";
import { InfectionCard } from "../../models/InfectionCard";
import { GameOverReason } from "../../models/GameOverReason";
import { Player } from "../../models/Player";

export const USER_ACTION = "USER_ACTION";
export const USER_MOVE_ACTION = `${USER_ACTION}_MOVE`;

export type UserMoveActionPayload = {
  playerName: string;
  characterName: string;
  originCityName: string;
  targetCityName: string;
};

export const driveOrFerry = createAction<UserMoveActionPayload>(
  `${USER_MOVE_ACTION}_DRIVE_FERRY`
);

export const takeDirectFlight = createAction<UserMoveActionPayload>(
  `${USER_MOVE_ACTION}_DIRECT_FLIGHT`
);

export const takeCharterFlight = createAction<UserMoveActionPayload>(
  `${USER_MOVE_ACTION}_CHARTER_FLIGHT`
);

export const takePrivateFlight = createAction<UserMoveActionPayload>(
  `${USER_MOVE_ACTION}_PRIVATE_FLIGHT`
);

export const buildResearchStation = createAction<{
  playerName: string;
  cityName: string;
}>(`${USER_ACTION}_BUILD_RESEARCH_STATION`);

export const treatDisease = createAction<{
  disease: keyof City["diseases"];
  cityName: string;
  casCure: boolean;
}>(`${USER_ACTION}_TREAT_DISEASE`);

export const setCityPosition = createAction<{
  cityName: CityName;
  position: Position;
}>("SET_CITY_POSITION");

export const discardCardAction = createAction<PlayerCard>("DISCARD_CARD");

export const endTurn = createAction("END_TURN_ACTION");

export const startGame = createAction<{
  players: Player[];
  epidemicsCount: number;
  infectionCards: InfectionCard[];
}>("START_GAME");

export const gameOver = createAction<GameOverReason>("GAME_OVER");

export const endActionsPhase = createAction("END_ACTIONS_PHASE");

export const endPlayerCardsPhase = createAction<{
  player: Player;
  drawnCards: PlayerCard[];
  discardedCards: PlayerCard[];
}>("END_PLAYER_CARDS_PHASE");

export const endInfectionCardsPhase = createAction<{
  infectionCards: InfectionCard[];
}>("END_INFECTION_CARDS_PHASE");

export const playEpidemicCard = createAction<{
  infectionCard: InfectionCard;
}>("PLAY_EPIDEMIC_CARD");
