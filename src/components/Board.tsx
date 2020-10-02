import React from "react";
import { useSelector } from "react-redux";
import { PlayerCharacter } from "./PlayerCharacter";
import { CityMarker } from "./CityMarker";
import { playersSelector } from "../redux/selectors/playersSelectors";
import {
  citiesSelector,
  routesSelector,
} from "../redux/selectors/citiesSelectors";
import { CityName } from "../models/City";
import { Route } from "./Route";

export const Board = (): JSX.Element => {
  const players = useSelector(playersSelector);
  const cities = useSelector(citiesSelector);
  const a = useSelector(routesSelector);
  return (
    <div>
      {players.map((p) => (
        <PlayerCharacter playerName={p.playerName} />
      ))}
      {cities.map((c) => (
        <CityMarker city={c} />
      ))}
      {a.map((routeString) => {
        const [from, to]: [CityName, CityName] = routeString.split("-") as [
          CityName,
          CityName
        ];

        return <Route key={routeString} fromCityName={from} toCityName={to} />;
      })}
    </div>
  );
};
