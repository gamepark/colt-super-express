import {  Locator, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";
import { trainCardDescription } from "../material/TrainCardDescription";

class BanditFigureLocator extends Locator {

  getCoordinates(_location: Location, context: MaterialContext) {
    const firstPlayer = context.rules.game.items[4]?.[0].id;
    const players = context.rules.game.players;
    console.log(firstPlayer);
    console.log(context.rules.game.players);
    console.log(context.rules.game.items[3]);
    console.log(context.player);
    
    

    for (let i = 1; i <= players.length; i++) {
      if (players[i] === firstPlayer) {
        return { y: 0, x: 0 - trainCardDescription.width };
      }
    }

    return {};
  }
}

export const banditFigureLocator = new BanditFigureLocator();
