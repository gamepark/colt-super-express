import { Character } from "../Character";
import { Action } from "./Action";

export enum ActionCard {
  BelleChangeFloor = Character.Belle * 10 + Action.ChangeFloor,
  BelleMove = Character.Belle * 10 + Action.Move,
  BelleFlip = Character.Belle * 10 + Action.Flip,
  BelleFire = Character.Belle * 10 + Action.Fire,
  CheyenneChangeFloor = Character.Cheyenne * 10 + Action.ChangeFloor,
  CheyenneMove = Character.Cheyenne * 10 + Action.Move,
  CheyenneFire = Character.Cheyenne * 10 + Action.Fire,
  CheyenneFlip = Character.Cheyenne * 10 + Action.Flip,
  DocChangeFloor = Character.Doc * 10 + Action.ChangeFloor,
  DocMove = Character.Doc * 10 + Action.Move,
  DocFire = Character.Doc * 10 + Action.Fire,
  DocFlip = Character.Doc * 10 + Action.Flip,
  DjangoChangeFloor = Character.Django * 10 + Action.ChangeFloor,
  DjangoMove = Character.Django * 10 + Action.Move,
  DjangoFire = Character.Django * 10 + Action.Fire,
  DjangoFlip = Character.Django * 10 + Action.Flip,
  GhostChangeFloor = Character.Ghost * 10 + Action.ChangeFloor,
  GhostMove = Character.Ghost * 10 + Action.Move,
  GhostFire = Character.Ghost * 10 + Action.Fire,
  GhostFlip = Character.Ghost * 10 + Action.Flip,
  MeiChangeFloor = Character.Mei * 10 + Action.ChangeFloor,
  MeiMove = Character.Mei * 10 + Action.Move,
  MeiFire = Character.Mei * 10 + Action.Fire,
  MeiFlip = Character.Mei * 10 + Action.Flip,
  TucoChangeFloor = Character.Tuco * 10 + Action.ChangeFloor,
  TucoMove = Character.Tuco * 10 + Action.Move,
  TucoFlip = Character.Tuco * 10 + Action.Flip,
  TucoFire = Character.Tuco * 10 + Action.Fire,
}

export type ActionCardId = {
  front?: ActionCard;
  back: Character;
};

export function getAction(actionCard: ActionCard) {
  return actionCard % 10;
}
