import { createReducer } from "@reduxjs/toolkit";
import { CardType } from "../../models/PlayerCard";
import { drawPlayerCard } from "../actions";

export const infectionRates = [2, 2, 2,3 ,3,4, 4];

export const infectionRate = createReducer(0, builder => builder.addCase(drawPlayerCard, (state, {payload: {card}} ) => {
    if (card.type === CardType.EPIDEMIC) {
        return state + 1;
    }
    return state;
}));