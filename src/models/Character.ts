export enum Role {
  ContintencyPlanner,
  OperationsExpert,
  Dispatcher,
  QuarantineSpecialist,
  Medic,
  Researcher,
  Scientist,
}

export type Character = {
  characterName: string;
  role: Role;
  cityName: string;
};
