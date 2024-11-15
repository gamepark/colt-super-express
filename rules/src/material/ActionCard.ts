import { Bandit } from "../Bandit";
import { Action } from "./Action";

export enum ActionCard {
  BelleChangeFloor = Bandit.Belle * 10 + Action.ChangeFloor,
  BelleMove = Bandit.Belle * 10 + Action.Move,
  BelleFlip = Bandit.Belle * 10 + Action.Flip,
  BelleFire = Bandit.Belle * 10 + Action.Fire,
  CheyenneChangeFloor = Bandit.Cheyenne * 10 + Action.ChangeFloor,
  CheyenneMove = Bandit.Cheyenne * 10 + Action.Move,
  CheyenneFire = Bandit.Cheyenne * 10 + Action.Fire,
  CheyenneFlip = Bandit.Cheyenne * 10 + Action.Flip,
  DocChangeFloor = Bandit.Doc * 10 + Action.ChangeFloor,
  DocMove = Bandit.Doc * 10 + Action.Move,
  DocFire = Bandit.Doc * 10 + Action.Fire,
  DocFlip = Bandit.Doc * 10 + Action.Flip,
  DjangoChangeFloor = Bandit.Django * 10 + Action.ChangeFloor,
  DjangoMove = Bandit.Django * 10 + Action.Move,
  DjangoFire = Bandit.Django * 10 + Action.Fire,
  DjangoFlip = Bandit.Django * 10 + Action.Flip,
  GhostChangeFloor = Bandit.Ghost * 10 + Action.ChangeFloor,
  GhostMove = Bandit.Ghost * 10 + Action.Move,
  GhostFire = Bandit.Ghost * 10 + Action.Fire,
  GhostFlip = Bandit.Ghost * 10 + Action.Flip,
  MeiChangeFloor = Bandit.Mei * 10 + Action.ChangeFloor,
  MeiMove = Bandit.Mei * 10 + Action.Move,
  MeiFire = Bandit.Mei * 10 + Action.Fire,
  MeiFlip = Bandit.Mei * 10 + Action.Flip,
  TucoChangeFloor = Bandit.Tuco * 10 + Action.ChangeFloor,
  TucoMove = Bandit.Tuco * 10 + Action.Move,
  TucoFlip = Bandit.Tuco * 10 + Action.Flip,
  TucoFire = Bandit.Tuco * 10 + Action.Fire,
}

export type ActionCardId = {
  front?: ActionCard;
  back: Bandit;
};

export function getAction(actionCard: ActionCard) {
  return actionCard % 10;
}
