import { createReducer, AnyAction } from "@reduxjs/toolkit";
import { charactersData } from "../../data/characters";
import { USER_MOVE_ACTION, UserMoveActionPayload } from "../actions/actions";

export type UserMoveAction = {
  type: string;
  payload: UserMoveActionPayload;
};

const isUserMoveAction = (action: AnyAction): action is UserMoveAction =>
  action.type.startsWith(USER_MOVE_ACTION);

export const characters = createReducer(charactersData, (builder) =>
  builder.addMatcher(
    isUserMoveAction,
    (state, { payload: { targetCityName, characterName } }) =>
      state.map((c) =>
        c.characterName === characterName
          ? {
              ...c,
              cityName: targetCityName,
            }
          : c
      )
  )
);
