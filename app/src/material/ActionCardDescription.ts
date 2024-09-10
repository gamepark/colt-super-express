import { CardDescription} from "@gamepark/react-game";
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
import { ActionCardType } from "@gamepark/colt-super-express/material/ActionCardType";
import { Character } from "@gamepark/colt-super-express/Character";

class ActionCardDescription extends CardDescription {
  width = 6.35;
  height = 8;

  backImages = {
[Character.Belle * 10 + ActionCardType.BackImage]: BelleBack,
[Character.Cheyenne * 10 + ActionCardType.BackImage]: CheyenneBack,
[Character.Doc * 10 + ActionCardType.BackImage]: DocBack,
[Character.Django * 10 + ActionCardType.BackImage]: DjangoBack,
[Character.Tuco * 10 + ActionCardType.BackImage]: TucoBack,
[Character.Mei * 10 + ActionCardType.BackImage]: MeiBack,
[Character.Ghost * 10 + ActionCardType.BackImage]: GhostBack,
  }
  ;

  images = {
    [Character.Belle * 10 + ActionCardType.ChangeFloor]: BelleChangeFloor,
    [Character.Belle * 10 + ActionCardType.Flip]: BelleFlip,
    [Character.Belle * 10 + ActionCardType.Fire]: BelleFire,
    [Character.Belle * 10 + ActionCardType.Move]: BelleMove,
    [Character.Cheyenne * 10 + ActionCardType.ChangeFloor]: CheyenneChangeFloor,
    [Character.Cheyenne + ActionCardType.Flip]: CheyenneFlip,
    [Character.Cheyenne  * 10+ ActionCardType.Fire]: CheyenneFire,
    [Character.Cheyenne  * 10+ ActionCardType.Move]: CheyenneMove,
    [Character.Doc * 10 + ActionCardType.ChangeFloor]: DocChangeFloor,
    [Character.Doc * 10 + ActionCardType.Flip]: DocFlip,
    [Character.Doc * 10 + ActionCardType.Fire]: DocFire,
    [Character.Doc * 10 + ActionCardType.Move]: DocMove,
    [Character.Django * 10 + ActionCardType.ChangeFloor]: DjangoChangeFloor,
    [Character.Django * 10 + ActionCardType.Flip]: DjangoFlip,
    [Character.Django * 10 + ActionCardType.Fire]: DjangoFire,
    [Character.Django * 10 + ActionCardType.Move]: DjangoMove,
    [Character.Ghost * 10 + ActionCardType.ChangeFloor]: GhostChangeFloor,
    [Character.Ghost * 10 + ActionCardType.Flip]: GhostFlip,
    [Character.Ghost * 10 + ActionCardType.Fire]: GhostFire,
    [Character.Ghost * 10 + ActionCardType.Move]: GhostMove,
    [Character.Mei * 10 + ActionCardType.ChangeFloor]: MeiChangeFloor,
    [Character.Mei * 10 + ActionCardType.Flip]: MeiFlip,
    [Character.Mei * 10 + ActionCardType.Fire]: MeiFire,
    [Character.Mei * 10 + ActionCardType.Move]: MeiMove,
    [Character.Tuco * 10 + ActionCardType.ChangeFloor]: TucoChangeFloor,
    [Character.Tuco * 10 + ActionCardType.Flip]: TucoFlip,
    [Character.Tuco * 10 + ActionCardType.Fire]: TucoFire,
    [Character.Tuco  * 10+ ActionCardType.Move]: TucoMove
  };

}

export const actionCardDescription = new ActionCardDescription();
