import React, { CSSProperties } from "react";
import { Position } from "../models/Position";

export type Props = {
  position: Position;
  children: JSX.Element | JSX.Element[];
};

export const PositionContainer = ({
  children,
  position,
}: Props): JSX.Element => {
  const style: CSSProperties = {
    position: "absolute",
    transition: "top .5s, left .5s",
    ...position,
  };

  return <div style={style}>{children}</div>;
};
