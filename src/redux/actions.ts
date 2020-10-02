import { createAction } from "@reduxjs/toolkit";
import { City } from "../models/City";
import { AppThunk } from "../app/store";
import {
  notUsedCharactersSelector,
  currentCharacterSelector,
} from "./selectors/charactersSelectors";
import { sample, sampleSize } from "lodash";
import { nonEpidemicPlayerCardsSelector } from "./selectors/playerCardsSelectors";
import { PlayerCard } from "../models/PlayerCard";
import {
  canDriveFerryToCitySelector,
  canFlightDirectlyToCitySelector,
  canTakeCharterFlightSelector,
  canTakePrivateFlightToCitySelector,
  canBuildResearchStationSelector,
  canTreatDiseaseSelector,
} from "./selectors/actionsSelectors";
import { currentPlayerNameSelector } from "./selectors/playersSelectors";
import {
  currentCityNameSelector,
  currentCitySelector,
} from "./selectors/citiesSelectors";
import { Disease } from "../models/Diseases";

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

export const drawCard = createAction<{
  playerName: string;
  card: PlayerCard;
}>("DRAW_CARD");

export const driveFerry = createAction<UserMoveActionPayload>(
  `${USER_MOVE_ACTION}_DRIVE_FERRY`
);

export const directFlight = createAction<UserMoveActionPayload>(
  `${USER_MOVE_ACTION}_DIRECT_FLIGHT`
);

export const charterFlight = createAction<UserMoveActionPayload>(
  `${USER_MOVE_ACTION}_CHARTER_FLIGHT`
);

export const privateFlight = createAction<UserMoveActionPayload>(
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

export const endTurnAction = createAction("END_TURN_ACTION");

export const driveFerryAction = (city: City): AppThunk => (
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
      driveFerry({
        playerName: currentPlayerName,
        characterName: currentCharacter.characterName,
        targetCityName: city.name,
        originCityName: currentCharacter.cityName,
      })
    );
  }
};

export const startGame = (): AppThunk => (dispatch, getState) => {
  const notUsedCharacters = notUsedCharactersSelector(getState());
  const character = sample(notUsedCharacters);
  const nonEpidemicPlayerCards = nonEpidemicPlayerCardsSelector(getState());
  const playerName = "slaid3r";

  if (character) {
    dispatch(
      addPlayer({
        playerName,
        characterName: character.characterName,
      })
    );

    sampleSize(nonEpidemicPlayerCards, 4).forEach((card) =>
      dispatch(
        drawCard({
          playerName,
          card,
        })
      )
    );
  }
};

export const directFlightAction = (targetCityName: string): AppThunk => (
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
      directFlight({
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
      charterFlight({
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
      privateFlight({
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
