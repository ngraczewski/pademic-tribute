import { City, CityColor } from "../models/City";

export const citiesData: City[] = [
  {
    name: "San Francisco",
    color: CityColor.BLUE,
    position: {
      top: "100px",
      left: "100px",
    },
    neighbours: ["Chicago"],
    hasResearchStation: true,
    diseases: {
      red: 0,
      black: 0,
      blue: 0,
      yellow: 0,
    },
  },
  {
    name: "Chicago",
    color: CityColor.BLUE,
    position: {
      top: "70px",
      left: "250px",
    },
    neighbours: ["San Francisco", "Atlanta", "Montreal"],
    hasResearchStation: false,
    diseases: {
      red: 0,
      black: 0,
      blue: 0,
      yellow: 0,
    },
  },
  {
    name: "Montreal",
    color: CityColor.BLUE,
    position: {
      top: "65px",
      left: "350px",
    },
    neighbours: ["Chicago", "Waszyngton", "Nowy Jork"],
    hasResearchStation: false,
    diseases: {
      red: 0,
      black: 0,
      blue: 0,
      yellow: 0,
    },
  },
  {
    name: "Nowy Jork",
    color: CityColor.BLUE,
    position: {
      top: "70px",
      left: "450px",
    },
    neighbours: ["Montreal", "Waszyngton"],
    hasResearchStation: false,
    diseases: {
      red: 0,
      black: 0,
      blue: 0,
      yellow: 0,
    },
  },
  {
    name: "Atlanta",
    color: CityColor.BLUE,
    position: {
      top: "140px",
      left: "270px",
    },
    neighbours: ["Chicago", "Waszyngton"],
    hasResearchStation: true,
    diseases: {
      red: 3,
      black: 0,
      blue: 0,
      yellow: 0,
    },
  },
  {
    name: "Waszyngton",
    color: CityColor.BLUE,
    position: {
      top: "130px",
      left: "420px",
    },
    neighbours: ["Atlanta", "Montreal", "Nowy Jork"],
    hasResearchStation: false,
    diseases: {
      red: 0,
      black: 0,
      blue: 0,
      yellow: 0,
    },
  },
];
