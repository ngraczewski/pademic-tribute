import { createReducer } from "@reduxjs/toolkit";
import { GameStage } from "../../models/GameStage";
import { gameOver, startGame } from "../actions";

export const gameStage = createReducer(GameStage.CONFIG, (builder) =>
  builder
    .addCase(gameOver, () => GameStage.LOST)
    .addCase(startGame, () => GameStage.IN_PROGRESS)
);
