import React from "react";
import { City } from "../models/City";
import { PositionContainer } from "./PositionContainer";
import {
  driveOrFerryAction,
  takeDirectFlightAction,
  takeCharterFlightAction,
  takePrivateFlightAction,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  canDriveFerryToCitySelector,
  canFlightDirectlyToCitySelector,
  canTakeCharterFlightSelector,
  canTakePrivateFlightToCitySelector,
} from "../redux/selectors/userActionsSelectors";

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

  return (
    <PositionContainer position={city.position}>
      <div key={city.name} onClick={() => handleCityClick(city)}>
        {city.name}
        {city.hasResearchStation && <span> (RS)</span>}
      </div>
      <div>
        {red ? <span>R{red}</span> : null}
        {blue ? <span>Bu{blue}</span> : null}
        {black ? <span>Ba{black}</span> : null}
        {yellow ? <span>Y{yellow}</span> : null}
      </div>
    </PositionContainer>
  );
};
