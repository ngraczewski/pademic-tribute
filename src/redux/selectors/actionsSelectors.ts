import { RootState } from "../../app/store";
import { createSelector } from "@reduxjs/toolkit";
import { ActionsState } from "../reducers/actionsReducer";

export const actionsSelector = (state: RootState): ActionsState =>
  state.actions;

export const actionsCountSelector = (state: RootState): number =>
  actionsSelector(state).count;

export const totalActionsCountSelector = (state: RootState): number =>
  actionsSelector(state).total;

export const hasActionsLeftSelector = createSelector(
  actionsCountSelector,
  (actionsCount) => !!actionsCount
);
