import { Locator, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class FirstPlayerLocator extends Locator {
  getCoordinates(_location: Location, context: MaterialContext) {
    const firstPlayer = context.rules.game.items[4]?.[0].id;
    const playersLenght = context.rules.game.players.length;
    const players = context.rules.game.players;

    switch (playersLenght) {
      case 2:
        if (context.player === firstPlayer) {
          return { y: 10 };
        } else {
          return { y: -10 };
        }

      case 3:
        if (context.player === firstPlayer) {
          return { y: 10 };
        } else if (players[1] === firstPlayer) {
          return { y: -10, x: -20 };
        } else {
          return { y: -10, x: 20 };
        }
      default:
        break;
      case 4:
        if (context.player === firstPlayer) {
          return { y: 10, x: -20 };
        } else if (players[1] === firstPlayer) {
          return { y: -10, x: -20 };
        } else if (players[2] === firstPlayer) {
          return { y: -10, x: 20 };
        } else {
          return { y: 10, x: 20 };
        }
      case 5:
        if (context.player === firstPlayer) {
          return { y: 10, x: -15 };
        } else if (players[1] === firstPlayer) {
          return { y: -10, x: -25 };
        } else if (players[2] === firstPlayer) {
          return { y: -10, x: 0 };
        } else if (players[3] === firstPlayer) {
          return { y: -10, x: 25 };
        } else {
          return { y: 10, x: 15 };
        }
      case 6:
        if (context.player === firstPlayer) {
          return { y: 10, x: 0 };
        } else if (players[1] === firstPlayer) {
          return { y: 10, x: -25 };
        } else if (players[2] === firstPlayer) {
          return { y: -10, x: -25 };
        } else if (players[3] === firstPlayer) {
          return { y: -10, x: 0 };
        } else if (players[4] === firstPlayer) {
          return { y: -10, x: 25 };
        } else {
          return { y: 10, x: 25 };
        }
      case 7:
        if (context.player === firstPlayer) {
          return { y: 10, x: 0 };
        } else if (players[1] === firstPlayer) {
          return { y: 10, x: -25 };
        } else if (players[2] === firstPlayer) {
          return { y: -10, x: -36 };
        } else if (players[3] === firstPlayer) {
          return { y: -10, x: -12};
        } else if (players[4] === firstPlayer) {
          return { y: -10, x: 12 };
        } else if (players[5] === firstPlayer) {
          return { y: -10, x: 36 };
        } else {
          return { y: 10, x: 25 };
        }
    }
    return {};
  }
}

export const firstPlayerLocator = new FirstPlayerLocator();
