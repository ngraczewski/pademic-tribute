import React, { CSSProperties } from "react";
import { useSelector } from "react-redux";
import { eventsSelector } from "../redux/selectors/eventsSelectors";

export const EventsList = (): JSX.Element => {
  const events = useSelector(eventsSelector);

  const style: CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
  };

  return (
    <div style={style}>
      {events.map((e) => (
        <div>
          {e.map((e) => (
            <div>{e}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
