import {
  Locator,
  MaterialContext,
} from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class FirstPlayerLocator extends Locator {
  getCoordinates(_location: Location, context: MaterialContext) {

console.log(context.material);



    return { y: -2 };
  }
}

export const firstPlayerLocator = new FirstPlayerLocator();
