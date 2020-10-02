import React from "react";
import { PositionContainer } from "./PositionContainer";
import { useSelector } from "react-redux";
import { characterSelector } from "../redux/selectors/charactersSelectors";
import { playerSelector } from "../redux/selectors/playersSelectors";
import { citySelector } from "../redux/selectors/citiesSelectors";

type Props = {
  playerName: string;
};

export const PlayerCharacter = ({ playerName }: Props): JSX.Element => {
  const { playerName: name, characterName } = useSelector(
    playerSelector(playerName)
  );
  const { cityName } = useSelector(characterSelector(characterName));
  const { position } = useSelector(citySelector(cityName));
  return (
    <PositionContainer
      position={{
        ...position,
        top: `calc(${position.top} - 20px)`,
      }}
    >
      <div>{name}</div>
    </PositionContainer>
  );
};
