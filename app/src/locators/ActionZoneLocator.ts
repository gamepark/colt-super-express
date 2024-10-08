import {
  DeckLocator,
  getRelativePlayerIndex,
  MaterialContext,
} from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class ActionZoneLocator extends DeckLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player);
    const players = context.rules.players.length;

    switch (players) {
      case 2:
        switch (playerIndex) {
          case 0:
            return { y: 10, x: -8 };
          case 1:
            return { y: -10, x: 8 };
          default:
            return {};
        }
      case 3:
        switch (playerIndex) {
          case 0:
            return { y: 10, x: -8 };
          case 1:
            return { y: -10, x: -12 };
          case 2:
            return { y: -10, x: 28 };
          default:
            return {};
        }
      case 4:
        switch (playerIndex) {
          case 0:
            return { y: 10, x: -28 };
          case 1:
            return { y: -10, x: -12};
          case 2:
            return { y: -10, x: 28 };
          case 3:
            return { y: 10, x: 12 };
          default:
            return {};
        }
      case 5:
        switch (playerIndex) {
          case 0:
            return { y: 10, x: -23 };
          case 1:
            return { y: -10, x: -17 };
          case 2:
            return { y: -12, x: 8 };
          case 3:
            return { y: -10, x: 33 };
          case 4:
            return { y: 10, x: 7 };
          default:
            return {};
        }
      case 6:
        switch (playerIndex) {
          case 0:
            return { y: 10, x: -8 };
          case 1:
            return { y: 10, x: -33 };
          case 2:
            return { y: -10, x: -17 };
          case 3:
            return { y: -10, x: 8 };
          case 4:
            return { y: -10, x: 33 };
          case 5:
            return { y: 10, x: 17 };
          default:
            return {};
        }
      case 7:
        switch (playerIndex) {
          case 0:
            return { y: 10, x: -8 };
          case 1:
            return { y: 10, x: -33 };
          case 2:
            return { y: -10, x: -28 };
          case 3:
            return { y: -12, x: -4 };
          case 4:
            return { y: -12, x: 20 };
          case 5:
            return { y: -10, x: 45 };
          case 6:
            return { y: 10, x: 17 };
          default:
            return {};
        }
      default:
        return {};
    }
  }
}

export const actionZoneLocator = new ActionZoneLocator();
