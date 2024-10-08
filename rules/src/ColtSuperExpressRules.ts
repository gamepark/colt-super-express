import {  hideFrontToOthers,   hideItemId,   MaterialGame,  MaterialMove,  PositiveSequenceStrategy,  SecretMaterialRules, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Character } from './Character'
import { SchemingRule } from './rules/SchemingRule'
import { RuleId } from './rules/RuleId'
import { ShootingRule } from './rules/ShootingRule'



/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class ColtSuperExpressRules
  extends SecretMaterialRules<Character, MaterialType, LocationType>
  implements
    TimeLimit<
      MaterialGame<Character, MaterialType, LocationType>,
      MaterialMove<Character, MaterialType, LocationType>,
      Character
    >
{
  rules = {
    [RuleId.Scheming]: SchemingRule,
    [RuleId.Shooting]: ShootingRule
  };

  hidingStrategies = {
    [MaterialType.ActionCard]: {
      [LocationType.PlayerHand]: hideFrontToOthers,
      [LocationType.ActionZone]: hideFrontToOthers,
    },
    [MaterialType.TrainCard]: {
      [LocationType.TrainLine]: hideItemId,
      
    }
  };

  locationsStrategies = {
    [MaterialType.ActionCard]: {
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.ActionZone]: new PositiveSequenceStrategy()
    },
    [MaterialType.BanditFigure]: {
      [LocationType.InTrainBanditZone]: new PositiveSequenceStrategy()
    },
  };

  giveTime(): number {
    return 60;
  }
}