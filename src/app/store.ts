import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { players } from "../redux/playersReducer";
import { cities } from "../redux/citiesReducer";
import { actions } from "../redux/actionsReducer";
import { characters } from "../redux/charactersReducer";
import { playerCards } from "../redux/playerCardsReducer";
import { cures } from "../redux/curesReducer";

export const store = configureStore({
  reducer: {
    players,
    cities,
    actions,
    characters,
    playerCards,
    cures,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
