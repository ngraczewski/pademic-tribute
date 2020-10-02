import React, { CSSProperties } from "react";
import { CityName } from "../models/City";
import { useSelector } from "react-redux";
import { citySelector } from "../redux/selectors/citiesSelectors";

export type Props = {
  fromCityName: CityName;
  toCityName: CityName;
};

export const Route = ({
  fromCityName,
  toCityName,
}: Props): JSX.Element | null => {
  const fromCity = useSelector(citySelector(fromCityName));
  const toCity = useSelector(citySelector(toCityName));

  const style: CSSProperties = {
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    bottom: 0,
    right: 0,
  };

  if (fromCityName === "San Francisco" && toCityName === "Sydney") {
    return null;
  }

  if (fromCityName === "Manila" && toCityName === "San Francisco") {
    return null;
  }

  if (fromCityName === "San Francisco" && toCityName === "Tokio") {
    return null;
  }

  if (fromCityName === "Los Angeles" && toCityName === "Sydney") {
    return null;
  }

  return (
    <svg style={style}>
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
