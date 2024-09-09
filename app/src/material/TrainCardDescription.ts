import { CardDescription } from "@gamepark/react-game";
import Locomotive from "../images/Locomotive.jpg";
import Car from "../images/TrainCar.jpg"
import { TrainCardType } from "@gamepark/colt-super-express/material/TrainCardType";

class TrainCardDescription extends CardDescription {
    width = 8.8
    height = 6.35
    images = {
        [TrainCardType.Locomotive]: Locomotive,
        [TrainCardType.Car]: Car
 }
}

export const trainCardDescription = new TrainCardDescription()