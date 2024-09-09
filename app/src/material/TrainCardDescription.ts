import { CardDescription } from "@gamepark/react-game";
import Locomotive from "../images/Locomotive.jpg"

class TrainCardDescription extends CardDescription {
    width = 8.8
    height = 6.35
 image = Locomotive
}

export const trainCardDescription = new TrainCardDescription()