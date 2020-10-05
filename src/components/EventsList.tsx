import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { eventsSelector } from "../redux/selectors/eventsSelectors";

export const EventsList = (): JSX.Element => {
  const events = useSelector(eventsSelector);

  const style: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    overflow: "auto",
  };

  const eventStyle: CSSProperties = {
    margin: "10px",
    padding: "10px",
    border: "1px solid black",
  };

  return (
    <div style={style}>
      {events.map((e) => (
        <div style={eventStyle}>
          {e.map((e) => (
            <div>{e}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
