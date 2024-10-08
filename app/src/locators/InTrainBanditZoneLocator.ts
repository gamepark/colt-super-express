import { MaterialType } from "@gamepark/colt-super-express/material/MaterialType";
import { Locator} from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";


class BanditFigureLocator extends Locator {
    parentItemType = MaterialType.TrainCard;

    getCoordinates(location: Location){
        return {
            x: -location.x!
        }
    }  
}

export const banditFigureLocator = new BanditFigureLocator();
