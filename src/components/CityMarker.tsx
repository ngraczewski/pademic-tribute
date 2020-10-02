import React, { CSSProperties } from "react";
import { City } from "../models/City";
import { PositionContainer } from "./PositionContainer";
import {
  driveOrFerryAction,
  takeDirectFlightAction,
  takeCharterFlightAction,
  takePrivateFlightAction,
  setCityPosition,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  canDriveFerryToCitySelector,
  canFlightDirectlyToCitySelector,
  canTakeCharterFlightSelector,
  canTakePrivateFlightToCitySelector,
} from "../redux/selectors/userActionsSelectors";
import { Position } from "../models/Position";
import { Disease } from "../models/Disease";

type Props = {
  city: City;
};

export const CityMarker = ({ city }: Props): JSX.Element => {
  const { red, blue, black, yellow } = city.diseases;
  const dispatch = useDispatch();
  const canDriveFerryToCity = useSelector(
    canDriveFerryToCitySelector(city.name)
  );
  const canFlightDirectlyToCity = useSelector(
    canFlightDirectlyToCitySelector(city.name)
  );

  const canTakeCharterFlightToCity = useSelector(
    canTakeCharterFlightSelector()
  );

  const canTakePrivateFlightToCity = useSelector(
    canTakePrivateFlightToCitySelector(city.name)
  );

  const handleCityClick = (city: City) => {
    console.log(canTakeCharterFlightToCity);
    if (canDriveFerryToCity) {
      dispatch(driveOrFerryAction(city));
    } else if (canFlightDirectlyToCity) {
      dispatch(takeDirectFlightAction(city.name));
    } else if (canTakeCharterFlightToCity) {
      dispatch(takeCharterFlightAction(city.name));
    } else if (canTakePrivateFlightToCity) {
      dispatch(takePrivateFlightAction(city.name));
    }
  };

  const handlePositionChange = (position: Position) => {
    dispatch(
      setCityPosition({
        cityName: city.name,
        position,
      })
    );
  };

  const diseaseIndicator = (disease: Disease): CSSProperties => ({
    backgroundColor: disease,
    borderRadius: "50%",
    color: disease === "yellow" ? "black" : "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "25px",
    width: "25px",
  });

  const cityIndicatorStyle: CSSProperties = {
    position: "relative",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    top: "-12px",
    left: "-12px",
    backgroundColor: city.color,
  };

  const cityNameStyle: CSSProperties = {
    position: "relative",
    zIndex: 1,
    backgroundColor: "white",
    userSelect: "none",
    top: "-16px",
    left: "8px",
  };

  const diseaseIndicatorsStyle: CSSProperties = {
    display: "flex",
    position: "relative",
    top: "-16px",
    left: "8px",
  };

  return (
    <PositionContainer
      position={city.position}
      onPositionChange={handlePositionChange}
    >
      <div key={city.name} onClick={() => handleCityClick(city)}>
        <div style={cityIndicatorStyle} />
        <div style={cityNameStyle}>
          {city.name}
          {city.hasResearchStation && <span> (RS)</span>}
        </div>
        <div style={diseaseIndicatorsStyle}>
          {red ? <span style={diseaseIndicator("red")}>{red}</span> : null}
          {blue ? <span style={diseaseIndicator("blue")}>{blue}</span> : null}
          {black ? (
            <span style={diseaseIndicator("black")}>{black}</span>
          ) : null}
          {yellow ? (
            <span style={diseaseIndicator("yellow")}>{yellow}</span>
          ) : null}
        </div>
      </div>
    </PositionContainer>
  );
};
