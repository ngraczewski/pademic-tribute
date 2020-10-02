import { createSelector } from "@reduxjs/toolkit";
import { currentCharacterSelector } from "./charactersSelectors";
import { citiesMapSelector } from "../selectors";

export const currentCitySelector = createSelector(
  currentCharacterSelector,
  citiesMapSelector,
  (currentCharacter, citiesMap) =>
    currentCharacter ? citiesMap[currentCharacter.cityName] : undefined
);

export const currentCityNameSelector = createSelector(
  currentCharacterSelector,
  (currentCharacter) => currentCharacter?.cityName
);
