import { Locator, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class BanditFigureLocator extends Locator {
  getCoordinates(location: Location, context:MaterialContext) {
      console.log(context.material);
      console.log(location);
      return {
          y:6
      }

  }
}

export const banditFigureLocator = new BanditFigureLocator()