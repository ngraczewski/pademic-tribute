import React from "react";
import { useSelector } from "react-redux";
import { citiesSelector } from "../redux/selectors";
import { PlayerCharacter } from "./PlayerCharacter";
import { CityMarker } from "./CityMarker";
import { playersSelector } from "../redux/selectors/playersSelectors";

export const Board = (): JSX.Element => {
  const players = useSelector(playersSelector);
  const cities = useSelector(citiesSelector);
  return (
    <div>
      {players.map((p) => (
        <PlayerCharacter playerName={p.playerName} />
      ))}
      {cities.map((c) => (
        <CityMarker city={c} />
      ))}
    </div>
  );
};
