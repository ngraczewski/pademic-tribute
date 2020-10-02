import React, { CSSProperties } from "react";
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

  const style: CSSProperties = {
    zIndex: 3,
    backgroundColor: "white",
  };
  return (
    <PositionContainer
      onPositionChange={() => {}}
      position={{
        ...position,
        top: position.top - 20,
      }}
      style={style}
    >
      <div style={style}>{name}</div>
    </PositionContainer>
  );
};
