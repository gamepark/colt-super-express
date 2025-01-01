import { CardDescription } from "@gamepark/react-game";
import Locomotive from "../images/Locomotive.jpg";

class LocomotiveCardDescription extends CardDescription {
  width = 8.8;
  height = 6.35;
  image = Locomotive;
  backImage = Locomotive;
}

export const locomotiveCardDescription = new LocomotiveCardDescription();
