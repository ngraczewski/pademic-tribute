import React from "react";
import { Board } from "./components/Board";
import { ActionsCounter } from "./components/ActionsCounter";
import { useSelector } from "react-redux";
import { PlayerActions } from "./components/PlayerActions";
import { GameConfig } from "./components/GameConfig";
import { gameOverReasonSelector, gameStageSelector } from "./redux/selectors/gameStageSelectors";
import { GameStage } from "./models/GameStage";
import { GameOverReason } from "./models/GameOverReason";
import { PlayersHands } from "./components/PlayersHands";
import { InfectionRateIndicator } from "./components/InfectionRateIndicator";
import { OutbreaksIndicator } from "./components/OutbreaksIndicator";
import { Modal } from "./components/Modal";
import { DiscardCardModal } from "./components/DiscardCardModal";

export const PandemicTribute = (): JSX.Element => {
  const gameStage = useSelector(gameStageSelector);
  const gameOverReason = useSelector(gameOverReasonSelector);
  
  return (
    <>
      {gameStage === GameStage.CONFIG && <GameConfig />}
      {gameStage === GameStage.IN_PROGRESS && (
        <>
          <Board />
          <InfectionRateIndicator/>
          <OutbreaksIndicator/>
          <ActionsCounter />
          <PlayerActions />
          <PlayersHands />
          <DiscardCardModal/>
        </>
      )}
      {gameStage === GameStage.LOST && <div>
        <div>Game Over</div>
        {gameOverReason === GameOverReason.DISEASE_SPREAD_TOO_MUCH && <div>Disease spread too much</div>}
        {gameOverReason === GameOverReason.GLOBAL_PANIC && <div>Global panic</div>}
        {gameOverReason === GameOverReason.OUT_OF_TIME && <div>Out of time</div>}
        </div>}
    </>
  );
};
