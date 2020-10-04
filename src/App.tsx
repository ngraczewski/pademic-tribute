import React from "react";
import { Board } from "./components/Board";
import { ActionsCounter } from "./components/ActionsCounter";
import { useSelector } from "react-redux";
import { PlayerActions } from "./components/PlayerActions";
import { GameConfig } from "./components/GameConfig";
import {
  gameOverReasonSelector,
  gameStageSelector,
} from "./redux/selectors/gameStageSelectors";
import { GameStage } from "./models/GameStage";
import { GameOverReason } from "./models/GameOverReason";
import { PlayersHands } from "./components/PlayersHands";
import { InfectionRateIndicator } from "./components/InfectionRateIndicator";
import { OutbreaksIndicator } from "./components/OutbreaksIndicator";
import { DiscardCardModal } from "./components/DiscardCardModal";
import { InfectionsIndicator } from "./components/InfectionsIndicator";
import { EventsList } from "./components/EventsList";

export const PandemicTribute = (): JSX.Element => {
  const gameStage = useSelector(gameStageSelector);
  const gameOverReason = useSelector(gameOverReasonSelector);

  return (
    <>
      {gameStage === GameStage.CONFIG && <GameConfig />}
      {gameStage === GameStage.IN_PROGRESS && (
        <>
          <Board />
          <InfectionRateIndicator />
          <InfectionsIndicator />
          <OutbreaksIndicator />
          <ActionsCounter />
          <PlayerActions />
          <PlayersHands />
          <DiscardCardModal />
          <EventsList />
        </>
      )}
      {gameStage === GameStage.LOST && (
        <div>
          <div>Game Over</div>
          {gameOverReason === GameOverReason.DISEASE_SPREAD_TOO_MUCH && (
            <>
              <div>Disease spread too much</div>
              <InfectionsIndicator />
            </>
          )}
          {gameOverReason === GameOverReason.GLOBAL_PANIC && (
            <>
              <div>Global panic</div>
              <OutbreaksIndicator />
            </>
          )}
          {gameOverReason === GameOverReason.OUT_OF_TIME && (
            <div>Out of time</div>
          )}
        </div>
      )}
    </>
  );
};
