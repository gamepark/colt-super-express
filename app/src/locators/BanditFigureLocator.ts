import { Locator, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class BanditFigureLocator extends Locator {
  getCoordinates(_location: Location, _context:MaterialContext) {

      return {
          y:6
      }

  }
}

export const banditFigureLocator = new BanditFigureLocator()