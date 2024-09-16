import { CardDescription } from "@gamepark/react-game";
import firstPlayer from "../images/FirstPlayer.jpg";

class FirstPlayerCardDescription extends CardDescription {
  width = 6.35;
  height = 8;

  image = firstPlayer;
}

export const firstPlayerCardDescription = new FirstPlayerCardDescription();
