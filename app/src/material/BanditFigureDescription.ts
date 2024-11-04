import { TokenDescription } from "@gamepark/react-game";
import BelleFigure from "../images/BelleFigure.png";
import CheyenneFigure from "../images/CheyenneFigure.png";
import DjangoFigure from "../images/DjangoFigure.png";
import DocFigure from "../images/DocFigure.png";
import MeiFigure from "../images/MeiFigure.png";
import GhostFigure from "../images/GhostFigure.png";
import TucoFigure from "../images/TucoFigure.png";
import { Character } from "@gamepark/colt-super-express/Character";
import { MaterialItem } from "@gamepark/rules-api";
import { css, Interpolation, Theme } from "@emotion/react";

class BanditFigureDescription extends TokenDescription {
  width = 2.6;
  height = 3.2;
  images = {
    [Character.Belle]: BelleFigure,
    [Character.Cheyenne]: CheyenneFigure,
    [Character.Doc]: DocFigure,
    [Character.Ghost]: GhostFigure,
    [Character.Django]: DjangoFigure,
    [Character.Mei]: MeiFigure,
    [Character.Tuco]: TucoFigure,
  };

  isFlipped(item: Partial<MaterialItem>) {
    return !item.location?.rotation.facingLocomotive;
    }
    
  // en attente simplification
  getFrontExtraCss(_itemId: any): Interpolation<Theme> {
    return css`
      backface-visibility: visible;
    `;
  }
}

export const banditFigureDescription = new BanditFigureDescription();
