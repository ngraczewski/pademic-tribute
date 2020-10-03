import React, { CSSProperties } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardType } from "../models/PlayerCard";
import { takeDirectFlightAction } from "../redux/actions";
import { isActivePlayerSelector, playerSelector } from "../redux/selectors/playersSelectors";

export type Props = {
  playerName: string;
}

export const PlayerHand = ({playerName}: Props): JSX.Element => {
  const player = useSelector(playerSelector(playerName));
  const isActivePlayer = useSelector(isActivePlayerSelector(playerName)); 
  const dispatch = useDispatch();

  const style: CSSProperties = {
    border: '2px solid white',
    borderColor: isActivePlayer ? 'teal' : 'white'
  }

  return (
    <div style={style}>
      <div>{playerName}</div>
      {player?.cards.map((card) => {
        const handleClick = () => {
          if (card.type !== CardType.CITY) {
            return;
          }

          dispatch(takeDirectFlightAction(card.cardName));
        };

        return (
          <div key={card.cardName} onClick={handleClick}>
            {card.cardName}
          </div>
        );
      })}
    </div>
  );
};
