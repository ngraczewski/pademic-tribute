import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { infectionsCountSelector } from "../redux/selectors/citiesSelectors";

export const InfectionsIndicator = (): JSX.Element => {
  const infectionsCount = useSelector(infectionsCountSelector);

  const style: CSSProperties = {
    display: "flex",
  };

  const indicatorStyle: CSSProperties = {
    marginLeft: "10px",
  };

  return (
    <div style={style}>
      <div>Red: {infectionsCount.red} / 24</div>
      <div style={indicatorStyle}>Blue: {infectionsCount.blue} / 24</div>
      <div style={indicatorStyle}>Black: {infectionsCount.black} / 24</div>
      <div style={indicatorStyle}>Yellow: {infectionsCount.yellow} / 24</div>
    </div>
  );
};
