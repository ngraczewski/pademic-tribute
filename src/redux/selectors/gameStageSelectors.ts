import { RootState } from "../../app/store";

export const gameStageSelector = (state: RootState) => state.gameStage.stage;

export const gameOverReasonSelector = (state: RootState) => state.gameStage.gameOverReason;
