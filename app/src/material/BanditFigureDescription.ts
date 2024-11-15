import { TokenDescription } from "@gamepark/react-game";
import BelleFigure from "../images/BelleFigure.png";
import CheyenneFigure from "../images/CheyenneFigure.png";
import DjangoFigure from "../images/DjangoFigure.png";
import DocFigure from "../images/DocFigure.png";
import MeiFigure from "../images/MeiFigure.png";
import GhostFigure from "../images/GhostFigure.png";
import TucoFigure from "../images/TucoFigure.png";
import { Bandit } from "@gamepark/colt-super-express/Bandit";
import { MaterialItem } from "@gamepark/rules-api";
import { css, Interpolation, Theme } from "@emotion/react";

class BanditFigureDescription extends TokenDescription {
  width = 2.6;
  height = 3.2;
  images = {
    [Bandit.Belle]: BelleFigure,
    [Bandit.Cheyenne]: CheyenneFigure,
    [Bandit.Doc]: DocFigure,
    [Bandit.Ghost]: GhostFigure,
    [Bandit.Django]: DjangoFigure,
    [Bandit.Mei]: MeiFigure,
    [Bandit.Tuco]: TucoFigure,
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
