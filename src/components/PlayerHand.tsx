import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardType } from "../models/PlayerCard";
import { takeDirectFlightAction } from "../redux/actions";
import { currentPlayerSelector } from "../redux/selectors/playersSelectors";

export const PlayerHand = (): JSX.Element => {
  const currentPlayer = useSelector(currentPlayerSelector);
  const dispatch = useDispatch();

  return (
    <div>
      {currentPlayer?.cards.map((card) => {
        const handleClick = () => {
          if (card.type !== CardType.CITY) {
            return;
          }

          dispatch(takeDirectFlightAction(card.cardName));
        };

        return <div onClick={handleClick}>{card.cardName}</div>;
      })}
    </div>
  );
};
