import { createReducer } from "@reduxjs/toolkit";
import { GameOverReason } from "../../models/GameOverReason";
import { GameStage } from "../../models/GameStage";
import { gameOver, startGame } from "../actions";

export type GameStageState = {
  stage: GameStage;
  gameOverReason?: GameOverReason;
}

export const initialState: GameStageState = {
  stage: GameStage.CONFIG,
  gameOverReason: undefined,
}

export const gameStage = createReducer(initialState, (builder) =>
  builder
    .addCase(gameOver, (state, {payload}) => ({
      ...state,
      stage: GameStage.LOST,
      gameOverReason: payload
    }))
    .addCase(startGame, (state) => ({
      ...state,
      stage: GameStage.IN_PROGRESS
    }))
);
