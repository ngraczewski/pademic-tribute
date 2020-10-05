import { RootState } from "../../app/store";
import { TurnPhase } from "../../models/TurnPhase";

export const gameStageSelector = (state: RootState) => state.gameStage.stage;

export const gameOverReasonSelector = (state: RootState) =>
  state.gameStage.gameOverReason;

export const turnPhaseSelector = (state: RootState) =>
  state.gameStage.turnPhase;

export const isPlayerCardsPhaseSelector = (state: RootState) =>
  turnPhaseSelector(state) === TurnPhase.PLAYER_CARDS;
