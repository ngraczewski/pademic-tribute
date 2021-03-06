import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { players } from "../redux/reducers/playersReducer";
import { citiesData } from "../redux/reducers/citiesReducer";
import { actions } from "../redux/reducers/actionsReducer";
import { characters } from "../redux/reducers/charactersReducer";
import { playerCards } from "../redux/reducers/playerCardsReducer";
import { cures } from "../redux/reducers/curesReducer";
import { gameStage } from "../redux/reducers/gameStageReducer";
import { infectionCards } from "../redux/reducers/infectionCardsReducer";
import { infectionRate } from "../redux/reducers/infectionRateReducer";
import { events } from "../redux/reducers/eventsReducer";

export const store = configureStore({
  reducer: {
    players,
    citiesData,
    actions,
    characters,
    playerCards,
    cures,
    gameStage,
    infectionCards,
    infectionRate,
    events,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
