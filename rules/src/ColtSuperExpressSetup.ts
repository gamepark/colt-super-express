import { MaterialGameSetup } from "@gamepark/rules-api";
import { ColtSuperExpressOptions } from "./ColtSuperExpressOptions";
import { ColtSuperExpressRules } from "./ColtSuperExpressRules";
import { LocationType } from "./material/LocationType";
import { MaterialType } from "./material/MaterialType";
import { Character } from "./Character";
import { RuleId } from "./rules/RuleId";
import { actions } from "./material/Action";
import { shuffle } from "lodash";

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
    this.setupBanditsFigure();
    this.setupFirstPlayerCard();
  }

  setupTrain() {
    const cars = shuffle([301, 312, 323, 345, 356, 367, 378, 389])
    
    for (let x = 1; x <= this.game.players.length + 1; x++) {
      this.material(MaterialType.TrainCard).createItem({
        id: cars.pop(),
        location: {
          type: LocationType.TrainLine,
          x,
        },
      });
    }
  }

  setupPlayerCards() {
    for (let x = 1; x <= this.game.players.length; x++) {
      const player = this.game.players[x - 1];

      this.material(MaterialType.ActionCard).createItems(
        actions.map((action) => ({
          id: {
            front: player * 10 + action,
            back: player,
          },
          location: {
            type: LocationType.PlayerHand,
            player,
          },
        }))
      );
    }
  }
  
  setupBanditsFigure() {
    for (let i = 0; i < this.game.players.length; i++) {
      const player = this.game.players[i];

      this.material(MaterialType.BanditFigure).createItem({
        id: player,
        location: {
          type: LocationType.InTrainBanditZone,
          parent: this.material(MaterialType.TrainCard)
            .location((l) => l.x === this.game.players.length - i)
            .getIndex(),
          rotation: {
            stunned: false,
            facingLocomotive: !(i >= this.game.players.length/2),
          },
        },
      });
    }
  }

  setupFirstPlayerCard() {

    this.material(MaterialType.FirstPlayerCard).createItem({
      id: this.game.players[0],
      location: {
        type: LocationType.FirstPlayerCardZone,
      },
    });
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0]);
  }
}
