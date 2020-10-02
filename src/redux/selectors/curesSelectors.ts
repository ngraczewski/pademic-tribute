import { RootState } from "../../app/store";
import { CuresState } from "../curesReducer";

export const curesSelector = (state: RootState): CuresState => state.cures;
