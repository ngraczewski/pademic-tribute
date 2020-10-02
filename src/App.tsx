import React, { useEffect } from "react";
import { Board } from "./components/Board";
import { ActionsCounter } from "./components/ActionsCounter";
import { EndTurnButton } from "./components/EndTurnButton";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "./redux/actions";
import { PlayerHand } from "./components/PlayerHand";
import { currentCharacterSelector } from "./redux/selectors/charactersSelectors";
import { PlayerActions } from "./components/PlayerActions";

export const PandemicTribute = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentCharacter = useSelector(currentCharacterSelector);
  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);
  return (
    <>
      {!!currentCharacter && (
        <>
          <Board />
          <ActionsCounter />
          <PlayerActions />
          <PlayerHand />
        </>
      )}
    </>
  );
};
