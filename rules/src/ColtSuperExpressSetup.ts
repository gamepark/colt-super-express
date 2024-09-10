import { MaterialGameSetup } from "@gamepark/rules-api";
import { ColtSuperExpressOptions } from "./ColtSuperExpressOptions";
import { ColtSuperExpressRules } from "./ColtSuperExpressRules";
import { LocationType } from "./material/LocationType";
import { MaterialType } from "./material/MaterialType";
import { Character } from "./Character";
import { RuleId } from "./rules/RuleId";
import { TrainCardType } from "./material/TrainCardType";
import { ActionCardType } from "./material/ActionCardType";

/**
 * This class creates a new Game based on the game options
 */
export class ColtSuperExpressSetup extends MaterialGameSetup<
  Character,
  MaterialType,
  LocationType,
  ColtSuperExpressOptions
> {
  Rules = ColtSuperExpressRules;

  setupMaterial(_options: ColtSuperExpressOptions) {
    this.setupTrain();
    this.setupPlayerCards();
  }

  setupTrain() {
    this.material(MaterialType.TrainCard).createItem({
      id: TrainCardType.Locomotive,
      location: {
        type: LocationType.TrainLine,
        x: 0,
      },
    });
    for (let x = 1; x <= this.game.players.length + 1; x++) {
      this.material(MaterialType.TrainCard).createItem({
        id: TrainCardType.Car,
        location: {
          type: LocationType.TrainLine,
          x,
        },
      });
    }
  }

  //mains carte action des joueurs

  setupPlayerCards() {
    for (let x = 1; x <= this.game.players.length; x++) {
      const Player = this.game.players[x-1];
      
      this.material(MaterialType.ActionCard).createItems([
        {
          id: Player * 10 + ActionCardType.ChangeFloor,
          location: {
            type: LocationType.PlayerHand,
          },
        },
        {
          id: Player * 10 + ActionCardType.Fire,
          location: {
            type: LocationType.PlayerHand,
          },
        },
        {
          id: Player * 10 + ActionCardType.Flip,
          location: {
            type: LocationType.PlayerHand,
          },
        },
        {
          id: Player * 10 + ActionCardType.BackImage,
          location: {
            type: LocationType.PlayerHand,
          },
        },
        {
          id: Player * 10 + ActionCardType.Move,
          location: {
            type: LocationType.PlayerHand,
          },
        },
      ]);
    }
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0]);
  }
}
