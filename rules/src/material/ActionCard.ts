import { Character } from "../Character";
import { Action } from "./Action";

export enum ActionCard {
  BelleChangeFloor = Character.Belle * 10 + Action.ChangeFloor,
}

export type ActionCardId = {
  front?: ActionCard;
  back: Character;
};

export function getAction(actionCard: ActionCard) {
  return actionCard % 10;
}
