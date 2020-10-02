import React from "react";
import { useDispatch } from "react-redux";
import { endTurnAction } from "../redux/actions";

export const EndTurnButton = () => {
  const dispatch = useDispatch();

  const endTurn = () => {
    dispatch(endTurnAction());
  };

  return <button onClick={endTurn}>End turn</button>;
};
