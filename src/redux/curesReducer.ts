import { createReducer } from "@reduxjs/toolkit";

export const initialState: {
  red: boolean;
  blue: boolean;
  black: boolean;
  yellow: boolean;
} = {
  black: false,
  blue: false,
  red: false,
  yellow: false,
};

export const cures = createReducer(initialState, {});
