import React from "react";
import { Board } from "./components/Board";
import { ActionsCounter } from "./components/ActionsCounter";
import { useSelector } from "react-redux";
import { PlayerHand } from "./components/PlayerHand";
import { currentCharacterSelector } from "./redux/selectors/charactersSelectors";
import { PlayerActions } from "./components/PlayerActions";
import { GameConfig } from "./components/GameConfig";

export const PandemicTribute = (): JSX.Element => {
  const currentCharacter = useSelector(currentCharacterSelector);
  return (
    <>
      {!!currentCharacter && (
        <>
          <Board />
          <ActionsCounter />
          <PlayerActions />
          <PlayerHand />
        </>
      )}
      {!currentCharacter && <GameConfig />}
    </>
  );
};
