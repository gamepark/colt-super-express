import { getEnumValues } from "@gamepark/rules-api";
import { Character } from "../Character";

export enum Action {
  Move = 1,
  Fire,
  Flip,
  ChangeFloor,
}

export const actions = getEnumValues(Action)

export type ActionCardId = {
  front?: Action
  back: Character
}