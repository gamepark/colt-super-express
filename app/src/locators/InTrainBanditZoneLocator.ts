import { MaterialType } from "@gamepark/colt-super-express/material/MaterialType";
import { Locator} from "@gamepark/react-game";


class BanditFigureLocator extends Locator {
    parentItemType = MaterialType.TrainCard;

// getPositionOnParent(_location: Location<number, number>, _context: MaterialContext<number, number, number>): XYCoordinates {
  
    // }

    
    
}

export const banditFigureLocator = new BanditFigureLocator();
