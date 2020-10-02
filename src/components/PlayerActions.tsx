import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { treatDiseaseAction } from "../redux/actions";
import { currentCitySelector } from "../redux/selectors/citiesSelectors";
import { City } from "../models/City";

export const PlayerActions = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCity = useSelector(currentCitySelector);

  const treatDisease = (disease: keyof City["diseases"]) =>
    dispatch(treatDiseaseAction(disease));

  const diseases: (keyof City["diseases"])[] = [
    "red",
    "black",
    "blue",
    "yellow",
  ];

  return (
    <>
      {diseases.map((d) =>
        currentCity?.diseases[d] ? (
          <button onClick={() => treatDisease(d)}>Treat {d}</button>
        ) : null
      )}
    </>
  );
};
