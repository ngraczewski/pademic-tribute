import { createReducer } from "@reduxjs/toolkit";
import { GameOverReason } from "../../models/GameOverReason";
import { GameStage } from "../../models/GameStage";
import { TurnPhase } from "../../models/TurnPhase";
import {
  endActionsPhase,
  endInfectionCardsPhase,
  endPlayerCardsPhase,
  gameOver,
  startGame,
} from "../actions/actions";

export type GameStageState = {
  stage: GameStage;
  gameOverReason?: GameOverReason;
  turnPhase: TurnPhase;
};

export const initialState: GameStageState = {
  stage: GameStage.CONFIG,
  gameOverReason: undefined,
  turnPhase: TurnPhase.PLAYER_ACTIONS,
};

export const gameStage = createReducer(initialState, (builder) =>
  builder
    .addCase(gameOver, (state, { payload }) => ({
      ...state,
      stage: GameStage.LOST,
      gameOverReason: payload,
    }))
    .addCase(startGame, (state) => ({
      ...state,
      stage: GameStage.IN_PROGRESS,
    }))
    .addCase(endActionsPhase, (state) => ({
      ...state,
      turnPhase: TurnPhase.PLAYER_CARDS,
    }))
    .addCase(endPlayerCardsPhase, (state) => ({
      ...state,
      turnPhase: TurnPhase.INFECTION_CARDS,
    }))
    .addCase(endInfectionCardsPhase, (state) => ({
      ...state,
      turnPhase: TurnPhase.PLAYER_ACTIONS,
    }))
);
