import { Position } from "./Position";

export enum CityColor {
  RED,
  BLUE,
  YELLOW,
  BLACK,
}

export type City = {
  name: string;
  color: CityColor;
  position: Position;
  neighbours: string[];
  hasResearchStation: boolean;
  diseases: {
    red: number;
    blue: number;
    yellow: number;
    black: number;
  };
};
