import { createReducer } from "@reduxjs/toolkit";
import { CureStage } from "../models/CureStage";

export type CuresState = {
  red: CureStage;
  blue: CureStage;
  black: CureStage;
  yellow: CureStage;
};

export const initialState: CuresState = {
  black: CureStage.NO_CURE,
  blue: CureStage.NO_CURE,
  red: CureStage.NO_CURE,
  yellow: CureStage.NO_CURE,
};

export const cures = createReducer(initialState, {});
