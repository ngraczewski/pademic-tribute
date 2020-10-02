import React, { CSSProperties } from "react";
import { CityName } from "../models/City";
import { useSelector } from "react-redux";
import { citySelector } from "../redux/selectors/citiesSelectors";

export type Props = {
  fromCityName: CityName;
  toCityName: CityName;
};

export const Route = ({ fromCityName, toCityName }: Props): JSX.Element => {
  const fromCity = useSelector(citySelector(fromCityName));
  const toCity = useSelector(citySelector(toCityName));

  const style: CSSProperties = {
    position: "absolute",
    transform: "transformY(-200px)",
    pointerEvents: "none",
    top: 0,
    left: 0,
    zIndex: -1,
  };

  return (
    <svg style={style} width="100%" height="100%">
      <line
        x1={fromCity.position.left}
        y1={fromCity.position.top}
        x2={toCity.position.left}
        y2={toCity.position.top}
        stroke="black"
      />
    </svg>
  );
};
