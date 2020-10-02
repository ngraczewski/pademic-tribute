import { createSelector } from "@reduxjs/toolkit";
import {
  currentCitySelector,
  currentCityNameSelector,
  citiesMapSelector,
} from "./citiesSelectors";
import { currentCharacterSelector } from "./charactersSelectors";
import { currentPlayerCardsSelector } from "./playersSelectors";
import { hasCard } from "../../utils/playerCardUtils";
import { hasActionsLeftSelector } from "./actionsSelectors";
import { CityName } from "../../models/City";

export const canDriveFerryToCitySelector = (targetCityName: CityName) =>
  createSelector(
    hasActionsLeftSelector,
    currentCitySelector,
    (hasActionsLeft, currentCity) => {
      const isNeighbour = currentCity?.neighbours.includes(targetCityName);

      return isNeighbour && hasActionsLeft;
    }
  );

export const canFlightDirectlyToCitySelector = (targetCityName: string) =>
  createSelector(
    hasActionsLeftSelector,
    currentPlayerCardsSelector,
    (hasActionsLeft, playerCards) => {
      const hasCityCard = hasCard(playerCards, targetCityName);

      return hasActionsLeft && hasCityCard;
    }
  );

export const canTakeCharterFlightSelector = () =>
  createSelector(
    hasActionsLeftSelector,
    currentPlayerCardsSelector,
    currentCharacterSelector,
    (hasActionsLeft, playerCards, character) => {
      const hasOriginCityCard = !!playerCards?.find(
        (card) => card.cardName === character?.cityName
      );

      return hasActionsLeft && hasOriginCityCard;
    }
  );

export const canTakePrivateFlightToCitySelector = (targetCityName: string) =>
  createSelector(
    hasActionsLeftSelector,
    currentCharacterSelector,
    citiesMapSelector,
    (hasActionsLeft, currentCharacter, citiesMap) => {
      const originCityName = currentCharacter?.cityName;
      const originCity = citiesMap[originCityName!];
      const targetCity = citiesMap[targetCityName];

      return (
        hasActionsLeft &&
        originCity.hasResearchStation &&
        targetCity.hasResearchStation
      );
    }
  );

export const canBuildResearchStationSelector = createSelector(
  hasActionsLeftSelector,
  currentCityNameSelector,
  currentPlayerCardsSelector,
  citiesMapSelector,
  (hasActionsLeft, currentCityName, playerCards, cititesMap) => {
    if (!currentCityName) {
      return false;
    }

    const hasCityCard = hasCard(playerCards, currentCityName);
    const currentCityHasResearchStation =
      cititesMap[currentCityName].hasResearchStation;

    return hasActionsLeft && hasCityCard && !currentCityHasResearchStation;
  }
);

export const canTreatDiseaseSelector = createSelector(
  hasActionsLeftSelector,
  currentCitySelector,
  (hasActionsLeft, currentCity) => {
    if (!currentCity) {
      return false;
    }

    const { red, blue, black, yellow } = currentCity.diseases;
    const hasDisease = red || blue || black || yellow;

    return hasActionsLeft && hasDisease;
  }
);
