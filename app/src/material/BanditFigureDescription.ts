import { CardDescription } from "@gamepark/react-game";
import BelleFigure from "../images/BelleFigure.png"
import CheyenneFigure from "../images/CheyenneFigure.png"
import DjangoFigure from "../images/DjangoFigure.png"
import DocFigure from "../images/DocFigure.png"
import MeiFigure from "../images/MeiFigure.png"
import GhostFigure from "../images/GhostFigure.png"
import TucoFigure from "../images/TucoFigure.png"
import { Character } from "@gamepark/colt-super-express/Character";

class BanditFigureDescription extends CardDescription {
    width = 2.5
    height = 3.5
    
    images = {
        [Character.Belle]: BelleFigure,
        [Character.Cheyenne]: CheyenneFigure,
        [Character.Doc]: DocFigure,
        [Character.Ghost]: GhostFigure,
        [Character.Django]: DjangoFigure,
        [Character.Mei]: MeiFigure,
        [Character.Tuco]: TucoFigure
    }
}

export const banditFigureDescription = new BanditFigureDescription()