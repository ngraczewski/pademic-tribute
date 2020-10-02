import { createReducer } from "@reduxjs/toolkit";
import { playerCardsData } from "../../data/playerCards";

export const playerCards = createReducer(playerCardsData, {});
