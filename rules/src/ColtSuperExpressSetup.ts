import { MaterialGameSetup } from '@gamepark/rules-api'
import { ColtSuperExpressOptions } from './ColtSuperExpressOptions'
import { ColtSuperExpressRules } from './ColtSuperExpressRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Character } from './Character'
import { RuleId } from './rules/RuleId'
import { TrainCardType } from './material/TrainCardType'

/**
 * This class creates a new Game based on the game options
 */
export class ColtSuperExpressSetup extends MaterialGameSetup<Character, MaterialType, LocationType, ColtSuperExpressOptions> {
  Rules = ColtSuperExpressRules

  setupMaterial(_options: ColtSuperExpressOptions) {
    this.setupTrain()
  }

  setupTrain() {
    this.material(MaterialType.TrainCard).createItem({
      id: TrainCardType.Locomotive,
      location: {
        type: LocationType.TrainLine, x:0
      }
    })
    for (let x = 1; x <= this.game.players.length+1; x++) {
          this.material(MaterialType.TrainCard).createItem({
            id: TrainCardType.Car,
      location: {
        type: LocationType.TrainLine, x
      }
    })
    }
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}