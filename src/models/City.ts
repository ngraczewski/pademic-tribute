import { Position } from "./Position";

export type BlueCityName =
  | "San Francisco"
  | "Chicago"
  | "Montreal"
  | "Nowy Jork"
  | "Waszyngton"
  | "Atlanta"
  | "Londyn"
  | "Madryt"
  | "Paryz"
  | "Essen"
  | "Mediolan"
  | "Petersburg";

export type BlackCityName =
  | "Moskwa"
  | "Stambul"
  | "Kair"
  | "Algier"
  | "Bagdad"
  | "Teheran"
  | "Karaczi"
  | "Delhi"
  | "Kalkuta"
  | "Rijad"
  | "Cennaj"
  | "Mumbaj";

export type RedCityName =
  | "Pekin"
  | "Seul"
  | "Tokio"
  | "Szanghaj"
  | "Osaka"
  | "Tajpej"
  | "Hongkong"
  | "Bangok"
  | "Dzakarta"
  | "Ho Chi Minh"
  | "Manila"
  | "Sydney";

export type YellowCityName =
  | "Los Angeles"
  | "Meksyk"
  | "Miami"
  | "Bogota"
  | "Lima"
  | "Santiago"
  | "Buenos Aires"
  | "Sao Paulo"
  | "Lagos"
  | "Chartum"
  | "Kinszasa"
  | "Johannesburg";

export type CityName =
  | BlueCityName
  | BlackCityName
  | RedCityName
  | YellowCityName;

export type CityColor = "red" | "blue" | "black" | "yellow";

export type City = {
  name: CityName;
  color: CityColor;
  position: Position;
  neighbors: CityName[];
  hasResearchStation: boolean;
  diseases: {
    red: number;
    blue: number;
    yellow: number;
    black: number;
  };
};
