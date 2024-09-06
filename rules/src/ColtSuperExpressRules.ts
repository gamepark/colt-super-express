import { MaterialGame, MaterialMove, MaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Character } from './Character'
import { PlayerTurn } from './rules/PlayerTurn'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ColtSuperExpressRules extends MaterialRules<Character, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<Character, MaterialType, LocationType>, MaterialMove<Character, MaterialType, LocationType>, Character> {
  rules = {
    [RuleId.PlayerTurn]: PlayerTurn
  }

  giveTime(): number {
    return 60
  }
}