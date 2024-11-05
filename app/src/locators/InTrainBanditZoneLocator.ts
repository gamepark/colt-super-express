import { MaterialType } from "@gamepark/colt-super-express/material/MaterialType";
import { Locator, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class BanditFigureLocator extends Locator {
  parentItemType = MaterialType.TrainCard;

  getCoordinates(location: Location, context: MaterialContext) {
    const playerId = context.player;
    const banditLocationId = context.rules.game.items[3]?.find(
      (item) => item.id === playerId
    )?.location.id;

    return {
      x: -location.x!,
      y: banditLocationId === 1 ? 0 : -1.5,
    };
  }
}

export const banditFigureLocator = new BanditFigureLocator();
