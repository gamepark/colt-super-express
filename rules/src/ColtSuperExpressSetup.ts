import { MaterialGameSetup } from '@gamepark/rules-api'
import { ColtSuperExpressOptions } from './ColtSuperExpressOptions'
import { ColtSuperExpressRules } from './ColtSuperExpressRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class ColtSuperExpressSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, ColtSuperExpressOptions> {
  Rules = ColtSuperExpressRules

  setupMaterial(_options: ColtSuperExpressOptions) {
  }

  start() {
    this.startPlayerTurn(RuleId.PlayerTurn, this.game.players[0])
  }
}