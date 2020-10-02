import React from "react";
import { Board } from "./components/Board";
import { ActionsCounter } from "./components/ActionsCounter";
import { useSelector } from "react-redux";
import { PlayerHand } from "./components/PlayerHand";
import { PlayerActions } from "./components/PlayerActions";
import { GameConfig } from "./components/GameConfig";
import { gameStageSelector } from "./redux/selectors/gameStageSelectors";
import { GameStage } from "./models/GameStage";

export const PandemicTribute = (): JSX.Element => {
  const gameStage = useSelector(gameStageSelector);
  return (
    <>
      {gameStage === GameStage.CONFIG && <GameConfig />}
      {gameStage === GameStage.IN_PROGRESS && (
        <>
          <Board />
          <ActionsCounter />
          <PlayerActions />
          <PlayerHand />
        </>
      )}
      {gameStage === GameStage.LOST && <div>Game Over</div>}
    </>
  );
};
