import { CardDescription } from "@gamepark/react-game";
import BelleBack from "../images/BelleBack.jpg";
import BelleChangeFloor from "../images/BelleChangeFloor.jpg";
import BelleFire from "../images/BelleFire.jpg";
import BelleFlip from "../images/BelleFlip.jpg";
import BelleMove from "../images/BelleMove.jpg";
import CheyenneBack from "../images/CheyenneBack.jpg";
import CheyenneChangeFloor from "../images/CheyenneChangeFloor.jpg";
import CheyenneFire from "../images/CheyenneFire.jpg";
import CheyenneFlip from "../images/CheyenneFlip.jpg";
import CheyenneMove from "../images/CheyenneMove.jpg";
import DjangoBack from "../images/DjangoBack.jpg";
import DjangoChangeFloor from "../images/DjangoChangeFloor.jpg";
import DjangoFire from "../images/DjangoFire.jpg";
import DjangoFlip from "../images/DjangoFlip.jpg";
import DjangoMove from "../images/DjangoMove.jpg";
import DocBack from "../images/DocBack.jpg";
import DocChangeFloor from "../images/DocChangeFloor.jpg";
import DocFire from "../images/DocFire.jpg";
import DocFlip from "../images/DocFlip.jpg";
import DocMove from "../images/DocMove.jpg";
import GhostBack from "../images/GhostBack.jpg";
import GhostChangeFloor from "../images/GhostChangeFloor.jpg";
import GhostFire from "../images/GhostFire.jpg";
import GhostFlip from "../images/GhostFlip.jpg";
import GhostMove from "../images/GhostMove.jpg";
import MeiBack from "../images/MeiBack.jpg";
import MeiChangeFloor from "../images/MeiChangeFloor.jpg";
import MeiFire from "../images/MeiFire.jpg";
import MeiFlip from "../images/MeiFlip.jpg";
import MeiMove from "../images/MeiMove.jpg";
import TucoBack from "../images/TucoBack.jpg";
import TucoChangeFloor from "../images/TucoChangeFloor.jpg";
import TucoFire from "../images/TucoFire.jpg";
import TucoFlip from "../images/TucoFlip.jpg";
import TucoMove from "../images/TucoMove.jpg";
import { Action } from "@gamepark/colt-super-express/material/Action";
import { Character } from "@gamepark/colt-super-express/Character";

class ActionCardDescription extends CardDescription {
  width = 6.35;
  height = 8;

  backImages = {
    [Character.Belle]: BelleBack,
    [Character.Cheyenne]: CheyenneBack,
    [Character.Doc]: DocBack,
    [Character.Django]: DjangoBack,
    [Character.Tuco]: TucoBack,
    [Character.Mei]: MeiBack,
    [Character.Ghost]: GhostBack,
  };

  images = {
    [Character.Belle * 10 + Action.ChangeFloor]: BelleChangeFloor,
    [Character.Belle * 10 + Action.Flip]: BelleFlip,
    [Character.Belle * 10 + Action.Fire]: BelleFire,
    [Character.Belle * 10 + Action.Move]: BelleMove,
    [Character.Cheyenne * 10 + Action.ChangeFloor]: CheyenneChangeFloor,
    [Character.Cheyenne * 10 + Action.Flip]: CheyenneFlip,
    [Character.Cheyenne * 10 + Action.Fire]: CheyenneFire,
    [Character.Cheyenne * 10 + Action.Move]: CheyenneMove,
    [Character.Doc * 10 + Action.ChangeFloor]: DocChangeFloor,
    [Character.Doc * 10 + Action.Flip]: DocFlip,
    [Character.Doc * 10 + Action.Fire]: DocFire,
    [Character.Doc * 10 + Action.Move]: DocMove,
    [Character.Django * 10 + Action.ChangeFloor]: DjangoChangeFloor,
    [Character.Django * 10 + Action.Flip]: DjangoFlip,
    [Character.Django * 10 + Action.Fire]: DjangoFire,
    [Character.Django * 10 + Action.Move]: DjangoMove,
    [Character.Ghost * 10 + Action.ChangeFloor]: GhostChangeFloor,
    [Character.Ghost * 10 + Action.Flip]: GhostFlip,
    [Character.Ghost * 10 + Action.Fire]: GhostFire,
    [Character.Ghost * 10 + Action.Move]: GhostMove,
    [Character.Mei * 10 + Action.ChangeFloor]: MeiChangeFloor,
    [Character.Mei * 10 + Action.Flip]: MeiFlip,
    [Character.Mei * 10 + Action.Fire]: MeiFire,
    [Character.Mei * 10 + Action.Move]: MeiMove,
    [Character.Tuco * 10 + Action.ChangeFloor]: TucoChangeFloor,
    [Character.Tuco * 10 + Action.Flip]: TucoFlip,
    [Character.Tuco * 10 + Action.Fire]: TucoFire,
    [Character.Tuco * 10 + Action.Move]: TucoMove,
  };
}

export const actionCardDescription = new ActionCardDescription();
