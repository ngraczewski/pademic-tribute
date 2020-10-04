import { createAction } from "@reduxjs/toolkit";
import { City, CityName } from "../models/City";
import { AppThunk } from "../app/store";
import {
  currentCharacterSelector,
  charactersSelector,
} from "./selectors/charactersSelectors";
import { chunk, last, sampleSize, times } from "lodash";
import {
  nonEpidemicPlayerCardsSelector,
  playerCardsSelector,
} from "./selectors/playerCardsSelectors";
import { CardType, PlayerCard } from "../models/PlayerCard";
import {
  canDriveFerryToCitySelector,
  canFlightDirectlyToCitySelector,
  canTakeCharterFlightSelector,
  canTakePrivateFlightToCitySelector,
  canBuildResearchStationSelector,
  canTreatDiseaseSelector,
} from "./selectors/userActionsSelectors";
import { currentPlayerNameSelector } from "./selectors/playersSelectors";
import { Disease } from "../models/Disease";
import {
  currentCityNameSelector,
  currentCitySelector,
  diseaseSpreadTooMuchSelector,
  outbreaksCountSelector,
} from "./selectors/citiesSelectors";
import { Position } from "../models/Position";
import { InfectionCard } from "../models/InfectionCard";
import { infectionCardsSelector } from "./selectors/infectionCardsSelectors";
import { GameOverReason } from "../models/GameOverReason";
import { infectionsPerInfectionPhaseSelector } from "./selectors/infectionRateSelectors";
import { Player } from "../models/Player";

export const USER_ACTION = "USER_ACTION";
export const USER_MOVE_ACTION = `${USER_ACTION}_MOVE`;

export type UserMoveActionPayload = {
  playerName: string;
  characterName: string;
  originCityName: string;
  targetCityName: string;
};

export const drawPlayerCard = createAction<{
  playerName: string;
  card: PlayerCard;
}>("DRAW_PLAYER_CARD");

export const drawInfectionCard = createAction<{
  card: InfectionCard;
}>("DRAW_INFECTION_CARD");

export const infectCity = createAction<{
  cityName: CityName;
  infectionsCount: number;
  disease: Disease;
}>("INFECT_CITY");

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

export const intensify = createAction("INTENSIFY");

export const startGameAction = ({
  players,
  epidemics,
}: {
  players: number;
  epidemics: number;
}): AppThunk => (dispatch, getState) => {
  const characters = sampleSize(charactersSelector(getState()), players);
  const nonEpidemicPlayerCards = nonEpidemicPlayerCardsSelector(getState());
  const cardsPerPlayer = Math.ceil(8 / players);
  const cardsToDraw = cardsPerPlayer * players;
  const cards = sampleSize(nonEpidemicPlayerCards, cardsToDraw);
  const playerDecks = chunk(cards, players);
  const infectionCards = infectionCardsSelector(getState());

  const playersList: Player[] = times(players).map((i) => ({
    playerName: `Player ${i + 1}`,
    characterName: characters[i].characterName,
    cards: playerDecks[i],
  }));

  dispatch(
    startGame({
      epidemicsCount: epidemics,
      players: playersList,
      infectionCards: infectionCards.slice(0, 9),
    })
  );
};

export const applyInfectionPhase = (): AppThunk => (dispatch, getState) => {
  const infectionsPerInfectionPhase = infectionsPerInfectionPhaseSelector(
    getState()
  );
  const infectionCards = infectionCardsSelector(getState());
  for (let i = 0; i < infectionsPerInfectionPhase; i++) {
    const infectionCard = infectionCards[i];
    dispatch(
      drawInfectionCard({
        card: infectionCard,
      })
    );
    dispatch(
      infectCityAction({
        cityName: infectionCard.cardName,
        disease: infectionCard.disease,
        infectionsCount: 1,
      })
    );
  }
};

export const applyEpidemicCard = (): AppThunk => (dispatch, getState) => {
  const infectionCards = infectionCardsSelector(getState());
  const card = last(infectionCards);

  if (!card) {
    return;
  }

  dispatch(
    drawInfectionCard({
      card,
    })
  );
  dispatch(
    infectCityAction({
      cityName: card.cardName,
      disease: card.disease,
      infectionsCount: 3,
    })
  );
  dispatch(intensify());
};

export const applyDrawPlayerCardsPhase = (playerName: string): AppThunk => (
  dispatch,
  getState
) => {
  const playerCards = playerCardsSelector(getState());

  if (playerCards.length < 2) {
    dispatch(gameOver(GameOverReason.OUT_OF_TIME));
    return;
  }

  for (let i = 0; i < 2; i++) {
    const card = playerCards[i];
    dispatch(
      drawPlayerCard({
        playerName,
        card,
      })
    );
    if (card.type === CardType.EPIDEMIC) {
      dispatch(applyEpidemicCard());
    }
  }
};

export const endTurnAction = (): AppThunk => (dispatch, getState) => {
  const currentPlayerName = currentPlayerNameSelector(getState());

  if (currentPlayerName) {
    dispatch(applyDrawPlayerCardsPhase(currentPlayerName));
    dispatch(applyInfectionPhase());
    dispatch(endTurn());
  }
};

export const driveOrFerryAction = (city: City): AppThunk => (
  dispatch,
  getState
) => {
  const canDriveFerryToCity = canDriveFerryToCitySelector(city.name)(
    getState()
  );
  const currentPlayerName = currentPlayerNameSelector(getState());
  const currentCharacter = currentCharacterSelector(getState());

  if (canDriveFerryToCity && currentCharacter && currentPlayerName) {
    dispatch(
      driveOrFerry({
        playerName: currentPlayerName,
        characterName: currentCharacter.characterName,
        targetCityName: city.name,
        originCityName: currentCharacter.cityName,
      })
    );
  }
};

export const takeDirectFlightAction = (targetCityName: string): AppThunk => (
  dispatch,
  getState
) => {
  const canFlightDirectlyToCity = canFlightDirectlyToCitySelector(
    targetCityName
  )(getState());
  const currentPlayerName = currentPlayerNameSelector(getState());
  const currentCharacter = currentCharacterSelector(getState());

  if (canFlightDirectlyToCity && currentPlayerName && currentCharacter) {
    dispatch(
      takeDirectFlight({
        characterName: currentCharacter.characterName,
        targetCityName,
        originCityName: currentCharacter.cityName,
        playerName: currentPlayerName,
      })
    );
  }
};

export const takeCharterFlightAction = (cityName: string): AppThunk => (
  dispatch,
  getState
) => {
  const canTakeCharterFlightToCity = canTakeCharterFlightSelector()(getState());
  const currentPlayerName = currentPlayerNameSelector(getState());
  const currentCharacter = currentCharacterSelector(getState());

  if (canTakeCharterFlightToCity && currentPlayerName && currentCharacter) {
    dispatch(
      takeCharterFlight({
        characterName: currentCharacter.characterName,
        originCityName: currentCharacter.cityName,
        playerName: currentPlayerName,
        targetCityName: cityName,
      })
    );
  }
};

export const takePrivateFlightAction = (cityName: string): AppThunk => (
  dispatch,
  getState
) => {
  const canTakePrivateFlightToCity = canTakePrivateFlightToCitySelector(
    cityName
  )(getState());
  const currentPlayerName = currentPlayerNameSelector(getState());
  const currentCharacter = currentCharacterSelector(getState());

  if (canTakePrivateFlightToCity && currentPlayerName && currentCharacter) {
    dispatch(
      takePrivateFlight({
        characterName: currentCharacter.characterName,
        originCityName: currentCharacter.cityName,
        playerName: currentPlayerName,
        targetCityName: cityName,
      })
    );
  }
};

export const buildResearchStationAction = (): AppThunk => (
  dispatch,
  getState
) => {
  const canBuildResearchStation = canBuildResearchStationSelector(getState());
  const currentPlayerName = currentPlayerNameSelector(getState());
  const currentCityName = currentCityNameSelector(getState());

  if (canBuildResearchStation && currentPlayerName && currentCityName) {
    dispatch(
      buildResearchStation({
        playerName: currentPlayerName,
        cityName: currentCityName,
      })
    );
  }
};

export const treatDiseaseAction = (disease: Disease): AppThunk => (
  dispatch,
  getState
) => {
  const canTreatDisease = canTreatDiseaseSelector(getState());
  const currentCity = currentCitySelector(getState());

  if (canTreatDisease && currentCity) {
    dispatch(
      treatDisease({
        disease,
        casCure: false,
        cityName: currentCity?.name,
      })
    );
  }
};

export const infectCityAction = (payload: {
  cityName: CityName;
  infectionsCount: number;
  disease: Disease;
}): AppThunk => (dispatch, getState) => {
  dispatch(infectCity(payload));

  const outbreaksCount = outbreaksCountSelector(getState());
  const diseaseSpreadTooMuch = diseaseSpreadTooMuchSelector(getState());

  if (outbreaksCount >= 8) {
    dispatch(gameOver(GameOverReason.GLOBAL_PANIC));
  }

  if (diseaseSpreadTooMuch) {
    dispatch(gameOver(GameOverReason.DISEASE_SPREAD_TOO_MUCH));
  }
};
