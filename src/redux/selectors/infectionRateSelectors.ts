import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const infectionRateSelector = (state: RootState) => state.infectionRate;

export const infectionsPerInfectionPhaseSelector =  createSelector(infectionRateSelector, (infectionRate) => [2, 2, 2, 3, 3, 4, 4][infectionRate]);