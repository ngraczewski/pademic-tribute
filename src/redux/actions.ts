import { createAction } from "@reduxjs/toolkit";
import { City, CityName } from "../models/City";
import { AppThunk } from "../app/store";
import {
  notUsedCharactersSelector,
  currentCharacterSelector,
} from "./selectors/charactersSelectors";
import { last, sampleSize } from "lodash";
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
} from "./selectors/citiesSelectors";
import { Position } from "../models/Position";
import { InfectionCard } from "../models/InfectionCard";
import { infectionCardsSelector } from "./selectors/infectionCardsSelectors";

export const USER_ACTION = "USER_ACTION";
export const USER_MOVE_ACTION = `${USER_ACTION}_MOVE`;

export type UserMoveActionPayload = {
  playerName: string;
  characterName: string;
  originCityName: string;
  targetCityName: string;
};

export const addPlayer = createAction<{
  playerName: string;
  characterName: string;
}>("ADD_PLAYER");

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

export const endTurn = createAction("END_TURN_ACTION");

export const startGame = createAction("START_GAME");

export const gameOver = createAction("GAME_OVER");

export const intensify = createAction("INTENSIFY");

export const shuffleEpidemicsIn = createAction<{
  epidemicsCount: number;
}>("SHUFLE_EPIDEMICS_IN");

export const startGameAction = ({
  players,
  epidemics,
}: {
  players: number;
  epidemics: number;
}): AppThunk => (dispatch, getState) => {
  const notUsedCharacters = notUsedCharactersSelector(getState());
  const characters = sampleSize(notUsedCharacters, players);
  const nonEpidemicPlayerCards = nonEpidemicPlayerCardsSelector(getState());
  const cardsPerPlayer = Math.ceil(8 / players);
  const cardsToDraw = cardsPerPlayer * players;
  const cards = sampleSize(nonEpidemicPlayerCards, cardsToDraw);

  for (let i = 0; i < players; i++) {
    const playerName = `Player ${i + 1}`;
    dispatch(
      addPlayer({
        playerName,
        characterName: characters[i].characterName,
      })
    );
    for (let j = 0; j < cardsPerPlayer; j++) {
      dispatch(
        drawPlayerCard({
          playerName,
          card: cards[i * cardsPerPlayer + j],
        })
      );
    }
  }

  dispatch(
    shuffleEpidemicsIn({
      epidemicsCount: epidemics,
    })
  );

  const infectionCards = infectionCardsSelector(getState());

  for (let i = 0; i < 3; i++) {
    const infectionCard = infectionCards[i];
    dispatch(
      drawInfectionCard({
        card: infectionCard,
      })
    );
    dispatch(
      infectCity({
        cityName: infectionCard.cardName,
        disease: infectionCard.disease,
        infectionsCount: 3,
      })
    );
  }

  for (let i = 3; i < 6; i++) {
    const infectionCard = infectionCards[i];
    dispatch(
      drawInfectionCard({
        card: infectionCard,
      })
    );
    dispatch(
      infectCity({
        cityName: infectionCard.cardName,
        disease: infectionCard.disease,
        infectionsCount: 2,
      })
    );
  }

  for (let i = 6; i < 9; i++) {
    const infectionCard = infectionCards[i];
    dispatch(
      drawInfectionCard({
        card: infectionCard,
      })
    );
    dispatch(
      infectCity({
        cityName: infectionCard.cardName,
        disease: infectionCard.disease,
        infectionsCount: 1,
      })
    );
  }

  dispatch(startGame());
};

export const applyInfectionPhase = (): AppThunk => (dispatch, getState) => {
  const infectionCards = infectionCardsSelector(getState());
  for (let i = 0; i < 2; i++) {
    const infectionCard = infectionCards[i];
    dispatch(
      drawInfectionCard({
        card: infectionCard,
      })
    );
    dispatch(
      infectCity({
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
    infectCity({
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
    dispatch(gameOver());
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
