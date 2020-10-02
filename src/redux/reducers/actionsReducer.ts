import { createReducer, AnyAction } from "@reduxjs/toolkit";
import { endTurnAction, USER_ACTION } from "../actions";

export type ActionsState = {
  count: number;
  total: number;
};

export type UserAction = {
  type: string;
};

const initialState: ActionsState = {
  count: 4,
  total: 4,
};

export const isUserAction = (action: AnyAction): action is UserAction =>
  action.type.startsWith(USER_ACTION);

export const actions = createReducer(initialState, (builder) =>
  builder
    .addCase(endTurnAction, (state) => ({
      ...state,
      count: state.total,
    }))
    .addMatcher(isUserAction, (state) => ({
      ...state,
      count: state.count - 1,
    }))
);
