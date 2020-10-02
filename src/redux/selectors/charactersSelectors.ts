import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Character } from "../../models/Character";
import { playersSelector, currentPlayerSelector } from "./playersSelectors";

export const charactersSelector = (state: RootState) => state.characters;

export const charactersMapSelector = createSelector(
  charactersSelector,
  (
    characters
  ): {
    [key: string]: Character;
  } =>
    characters.reduce(
      (charactersMap, character) => {
        charactersMap[character.characterName] = character;
        return charactersMap;
      },
      {} as {
        [key: string]: Character;
      }
    )
);

export const characterSelector = (characterName: string) => (
  state: RootState
): Character => charactersMapSelector(state)[characterName];

export const notUsedCharactersSelector = createSelector(
  playersSelector,
  charactersSelector,
  (players, characters) => {
    const usedCharacters = players.map((p) => p.characterName);

    return characters.filter((c) => !usedCharacters.includes(c.characterName));
  }
);

export const currentCharacterSelector = createSelector(
  currentPlayerSelector,
  charactersMapSelector,
  (currentPlayer, charactersMap) =>
    currentPlayer ? charactersMap[currentPlayer.characterName] : undefined
);
