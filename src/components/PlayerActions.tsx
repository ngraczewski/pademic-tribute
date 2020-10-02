import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  treatDiseaseAction,
  buildResearchStationAction,
} from "../redux/actions";
import { currentCitySelector } from "../redux/selectors/citiesSelectors";
import { Disease } from "../models/Disease";
import { EndTurnButton } from "./EndTurnButton";
import { canBuildResearchStationSelector } from "../redux/selectors/userActionsSelectors";

export const PlayerActions = (): JSX.Element => {
  const currentCity = useSelector(currentCitySelector);
  const canBuildResearchStation = useSelector(canBuildResearchStationSelector);

  const dispatch = useDispatch();
  const treatDisease = (disease: Disease) =>
    dispatch(treatDiseaseAction(disease));
  const buildResearchStation = () => dispatch(buildResearchStationAction());

  const diseases: Disease[] = ["red", "black", "blue", "yellow"];

  return (
    <>
      {diseases.map((d) => (
        <button
          disabled={!currentCity?.diseases[d]}
          onClick={() => treatDisease(d)}
        >
          Treat {d}
        </button>
      ))}
      <EndTurnButton />
      <button
        disabled={!canBuildResearchStation}
        onClick={buildResearchStation}
      >
        Build RS
      </button>
    </>
  );
};
