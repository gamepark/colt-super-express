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
    console.log(context.material);
    

    switch (players) {
      case 2:
        switch (playerIndex) {
          case 0:
            return { y: 20 };
          case 1:
            return { y: -20 };
          default:
            return {};
        }
      case 3:
        switch (playerIndex) {
          case 0:
            return { y: 20 };
          case 1:
            return { y: -20, x: -20 };
          case 2:
            return { y: -20, x: 20 };
          default:
            return {};
        }
      case 4:
        switch (playerIndex) {
          case 0:
            return { y: 20, x: -20 };
          case 1:
            return { y: -20, x: -20 };
          case 2:
            return { y: -20, x: 20 };
          case 3:
            return { y: 20, x: 20 };
          default:
            return {};
        }
      case 5:
        switch (playerIndex) {
          case 0:
            return { y: 20, x: -15 };
          case 1:
            return { y: -20, x: -25 };
          case 2:
            return { y: -22, x: 0 };
          case 3:
            return { y: -20, x: 25 };
          case 4:
            return { y: 20, x: 15 };
          default:
            return {};
        }
      case 6:
        switch (playerIndex) {
          case 0:
            return { y: 20, x: 0 };
          case 1:
            return { y: 20, x: -25 };
          case 2:
            return { y: -20, x: -25 };
          case 3:
            return { y: -20, x: 0 };
          case 4:
            return { y: -20, x: 25 };
          case 5:
            return { y: 20, x: 25 };
          default:
            return {};
        }
      case 7:
        switch (playerIndex) {
          case 0:
            return { y: 20, x: 0 };
          case 1:
            return { y: 20, x: -25 };
          case 2:
            return { y: -20, x: -36 };
          case 3:
            return { y: -22, x: -12 };
          case 4:
            return { y: -22, x: 12 };
          case 5:
            return { y: -20, x: 36 };
          case 6:
            return { y: 20, x: 25 };
          default:
            return {};
        }
      default:
        return {};
    }
  }

  getBaseAngle(location: Location, context: MaterialContext): number {
    const playerIndex = getRelativePlayerIndex(context, location.player);
    const players = context.rules.players.length;

    switch (players) {
      case 2:
        return playerIndex === 0 ? 0 : 180; 
      case 3:
        return playerIndex === 0 ? 0 : playerIndex === 1 ?170 : 190; 
      case 4:
        return playerIndex === 0 || playerIndex === 3 ? 0 : 180; 
      case 5:
        return playerIndex === 0 || playerIndex === 4  ? 0 : playerIndex === 2 ? 180 : playerIndex === 1 ? 170 :  190; 
      case 6:
        return playerIndex === 0 || playerIndex === 1 || playerIndex === 5 ? 0 : 180; 
      case 7:
        return playerIndex === 0 || playerIndex === 1 || playerIndex === 6
          ? 0
          : playerIndex === 2 
          ? 170
          :playerIndex === 5
          ? 190
          : 180; 
      default:
        return 0;
    }
  }
}

export const playerHandLocator = new PlayerHandLocator();
