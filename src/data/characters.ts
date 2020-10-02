import { Character, Role } from "../models/Character";

export const charactersData: Character[] = [
  { cityName: "Atlanta", role: Role.Medic, characterName: "Medic" },
  {
    cityName: "Atlanta",
    role: Role.ContintencyPlanner,
    characterName: "Contingency Planner",
  },
  {
    cityName: "Atlanta",
    role: Role.OperationsExpert,
    characterName: "Operations Expert",
  },
  { cityName: "Atlanta", role: Role.Dispatcher, characterName: "Dispatcher" },
  {
    cityName: "Atlanta",
    role: Role.QuarantineSpecialist,
    characterName: "Quarantine Specialist",
  },
  { cityName: "Atlanta", role: Role.Researcher, characterName: "Researcher" },
  { cityName: "Atlanta", role: Role.Scientist, characterName: "Scientist" },
];
