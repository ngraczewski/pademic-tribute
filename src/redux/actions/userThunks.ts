import { AppThunk } from "../../app/store";
import { City } from "../../models/City";
import { Disease } from "../../models/Disease";
import { currentCharacterSelector } from "../selectors/charactersSelectors";
import {
  currentCityNameSelector,
  currentCitySelector,
} from "../selectors/citiesSelectors";
import { currentPlayerNameSelector } from "../selectors/playersSelectors";
import {
  canDriveFerryToCitySelector,
  canFlightDirectlyToCitySelector,
  canTakeCharterFlightSelector,
  canTakePrivateFlightToCitySelector,
  canBuildResearchStationSelector,
  canTreatDiseaseSelector,
} from "../selectors/userActionsSelectors";
import {
  driveOrFerry,
  takeDirectFlight,
  takeCharterFlight,
  takePrivateFlight,
  buildResearchStation,
  treatDisease,
} from "./actions";

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
