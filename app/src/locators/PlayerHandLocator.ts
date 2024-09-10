import { getRelativePlayerIndex, HandLocator, MaterialContext } from "@gamepark/react-game";
import { Location } from "@gamepark/rules-api";

class PlayerHandLocator extends HandLocator {
    getCoordinates(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return {
      y: playerIndex *4,
    };
}
}

export const playerHandLocator = new PlayerHandLocator()