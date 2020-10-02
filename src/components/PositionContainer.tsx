import React, { CSSProperties, MouseEvent, useRef, createRef } from "react";
import { Position } from "../models/Position";

export type Props = {
  position: Position;
  children: JSX.Element | JSX.Element[];
  onPositionChange: (positon: Position) => void;
  style?: CSSProperties;
};

export const PositionContainer = ({
  children,
  position,
  onPositionChange,
  style,
}: Props): JSX.Element => {
  const ref = createRef<HTMLDivElement>();

  const onPositionChangeRef = useRef(onPositionChange);

  const currentPositionRef = useRef(position);
  const cursorPositionRef = useRef({
    clientX: 0,
    clientY: 0,
  });

  onPositionChangeRef.current = onPositionChange;

  const fullStyle: CSSProperties = {
    ...(style ?? {}),
    position: "absolute",
    transition: "top .5s, left .5s",
    ...position,
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const { current } = ref;

    const handleMouseMove = (event: MouseEvent<HTMLDocument>) => {
      event.preventDefault();

      const deltaX = cursorPositionRef.current.clientX - event.clientX;
      const deltaY = cursorPositionRef.current.clientY - event.clientY;

      cursorPositionRef.current = {
        clientX: event.clientX,
        clientY: event.clientY,
      };

      currentPositionRef.current = {
        left: currentPositionRef.current.left - deltaX,
        top: currentPositionRef.current.top - deltaY,
      };
      if (current) {
        current.style.left = currentPositionRef.current.left + "px";
        current.style.top = currentPositionRef.current.top + "px";
      }
    };

    const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
      document.onmousemove = null;
      document.onmouseup = null;
      onPositionChangeRef.current(currentPositionRef.current);
    };

    cursorPositionRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
    };
    document.onmousemove = handleMouseMove as any;
    document.onmouseup = handleMouseUp as any;
  };

  return (
    <div ref={ref} onMouseDown={handleMouseDown} style={fullStyle}>
      {children}
    </div>
  );
};
