import { getEnumValues } from "@gamepark/rules-api";

export enum Action {
  Move = 1,
  Fire,
  Flip,
  ChangeFloor,
}

export const actions = getEnumValues(Action)
