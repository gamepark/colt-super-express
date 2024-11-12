import { MaterialType } from "@gamepark/colt-super-express/material/MaterialType";
import { WagonFloor } from "@gamepark/colt-super-express/material/WagonFloor";
import { ListLocator, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class BanditFigureLocator extends ListLocator {
  parentItemType = MaterialType.TrainCard;

  getCoordinates(location: Location, context: MaterialContext) {
    const banditItemCount = this.countItems(location, context);

    return {
      x: Math.min(banditItemCount, this.maxCount) / 2,
      y: location.id === WagonFloor.InsideTrainCar ? 0 : -1.5,
    };
  }

  gap = { x: -1.5 };
  maxCount = 4;
  getRotateZ(location: Location) {
    if (location.rotation.stunned) {
      return location.rotation.facingLocomotive ? -90 : 90;
    } else {
      return 0;
    }
  }
}

export const banditFigureLocator = new BanditFigureLocator();
