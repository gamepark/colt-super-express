import { ListLocator } from "@gamepark/react-game";
import { trainCardDescription } from "../material/TrainCardDescription";

class TrainLineLocator extends ListLocator {
    gap = {
        x:-trainCardDescription.width
    }
}

export const trainLineLocator = new TrainLineLocator()