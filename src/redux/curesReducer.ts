import { createReducer } from "@reduxjs/toolkit";

export type CuresState = {
  red: boolean;
  blue: boolean;
  black: boolean;
  yellow: boolean;
};

export const initialState: CuresState = {
  black: false,
  blue: false,
  red: false,
  yellow: false,
};

export const cures = createReducer(initialState, {});
