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
import { Character } from "@gamepark/colt-super-express/Character";
import { ActionCard } from "@gamepark/colt-super-express/material/ActionCard";

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
    [ActionCard.BelleChangeFloor]: BelleChangeFloor,
    [ActionCard.BelleFlip]: BelleFlip,
    [ActionCard.BelleFire]: BelleFire,
    [ActionCard.BelleMove]: BelleMove,
    [ActionCard.CheyenneChangeFloor]: CheyenneChangeFloor,
    [ActionCard.CheyenneFlip]: CheyenneFlip,
    [ActionCard.CheyenneFire]: CheyenneFire,
    [ActionCard.CheyenneMove]: CheyenneMove,
    [ActionCard.DocChangeFloor]: DocChangeFloor,
    [ActionCard.DocFlip]: DocFlip,
    [ActionCard.DocFire]: DocFire,
    [ActionCard.DocMove]: DocMove,
    [ActionCard.DjangoChangeFloor]: DjangoChangeFloor,
    [ActionCard.DjangoFlip]: DjangoFlip,
    [ActionCard.DjangoFire]: DjangoFire,
    [ActionCard.DjangoMove]: DjangoMove,
    [ActionCard.GhostChangeFloor]: GhostChangeFloor,
    [ActionCard.GhostFlip]: GhostFlip,
    [ActionCard.GhostFire]: GhostFire,
    [ActionCard.GhostMove]: GhostMove,
    [ActionCard.MeiChangeFloor]: MeiChangeFloor,
    [ActionCard.MeiFlip]: MeiFlip,
    [ActionCard.MeiFire]: MeiFire,
    [ActionCard.MeiMove]: MeiMove,
    [ActionCard.TucoChangeFloor]: TucoChangeFloor,
    [ActionCard.TucoFlip]: TucoFlip,
    [ActionCard.TucoFire]: TucoFire,
    [ActionCard.TucoMove]: TucoMove,
  };
}

export const actionCardDescription = new ActionCardDescription();
