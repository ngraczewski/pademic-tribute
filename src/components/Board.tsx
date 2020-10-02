import React, { CSSProperties } from "react";
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

  const style: CSSProperties = {
    position: "relative",
    width: "100%",
    height: "80%",
  };

  return (
    <div style={style}>
      {players.map((p) => (
        <PlayerCharacter key={p.characterName} playerName={p.playerName} />
      ))}
      {cities.map((c) => (
        <CityMarker key={c.name} city={c} />
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
