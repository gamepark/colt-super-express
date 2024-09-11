import {
  getRelativePlayerIndex,
  HandLocator,
  MaterialContext,
} from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player);
    const players = context.rules.players.length;

    // Logs pour debug
    console.log(playerIndex);
    console.log(players);

    switch (players) {
      case 2:
        switch (playerIndex) {
          case 0:
            return { y: 15 };
          case 1:
            return { y: -15 };
          default:
            return {};
        }
      case 3:
        switch (playerIndex) {
          case 0:
            return { y: 15 };
          case 1:
            return { y: -15, x:15 };
          case 2:
            return { y: -15, x:-15 };
          default:
            return {};
        }
      case 4:
        switch (playerIndex) {
          case 0:
            return { y: 15 };
          case 1:
            return { y: 0 };
          case 2:
            return { y: -15 };
          case 3:
            return { y: -30 };
          default:
            return {};
        }
      case 5:
        switch (playerIndex) {
          case 0:
            return { y: 20 };
          case 1:
            return { y: 10 };
          case 2:
            return { y: 0 };
          case 3:
            return { y: -10 };
          case 4:
            return { y: -20 };
          default:
            return {};
        }
      case 6:
        switch (playerIndex) {
          case 0:
            return { y: 25 };
          case 1:
            return { y: 15 };
          case 2:
            return { y: 5 };
          case 3:
            return { y: -5 };
          case 4:
            return { y: -15 };
          case 5:
            return { y: -25 };
          default:
            return {};
        }
      case 7:
        switch (playerIndex) {
          case 0:
            return { y: 30 };
          case 1:
            return { y: 20 };
          case 2:
            return { y: 10 };
          case 3:
            return { y: 0 };
          case 4:
            return { y: -10 };
          case 5:
            return { y: -20 };
          case 6:
            return { y: -30 };
          default:
            return {};
        }
      default:
        return {};
    }
  }
}

export const playerHandLocator = new PlayerHandLocator();
