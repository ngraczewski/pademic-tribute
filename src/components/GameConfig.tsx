import React, { CSSProperties, useState } from "react";
import { useDispatch } from "react-redux";
import { startGameAction } from "../redux/actions";

export const GameConfig = (): JSX.Element => {
  const [players, setPlayers] = useState(2);
  const [epidemics, setEpidemics] = useState(4);
  const dispatch = useDispatch();

  const style = (active: boolean): CSSProperties => ({
    padding: "10px",
    border: "2px solid green",
    borderColor: active ? "violet" : "transparent",
  });

  const playersSectionStyle: CSSProperties = {
    display: "flex",
  };

  const startGame = () =>
    dispatch(
      startGameAction({
        players,
        epidemics,
      })
    );

  return (
    <div>
      <section style={playersSectionStyle}>
        Players
        <div style={style(players === 2)} onClick={() => setPlayers(2)}>
          2
        </div>
        <div style={style(players === 3)} onClick={() => setPlayers(3)}>
          3
        </div>
        <div style={style(players === 4)} onClick={() => setPlayers(4)}>
          4
        </div>
      </section>
      <section style={playersSectionStyle}>
        Epidemics
        <div style={style(epidemics === 4)} onClick={() => setEpidemics(4)}>
          4
        </div>
        <div style={style(epidemics === 5)} onClick={() => setEpidemics(5)}>
          5
        </div>
        <div style={style(epidemics === 6)} onClick={() => setEpidemics(6)}>
          6
        </div>
      </section>
      <button onClick={() => startGame()}>Start game</button>
    </div>
  );
};
