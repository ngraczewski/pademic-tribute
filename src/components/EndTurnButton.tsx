import React from "react";
import { useDispatch } from "react-redux";
import { endActionsPhaseAction } from "../redux/actions/gameThunks";

export const EndTurnButton = () => {
  const dispatch = useDispatch();

  const endTurn = () => {
    dispatch(endActionsPhaseAction());
  };

  return <button onClick={endTurn}>End turn</button>;
};
