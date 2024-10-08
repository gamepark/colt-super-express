import { PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { ActionCardId } from "../material/Action";
import { RuleId } from "./RuleId";

export class ShootingRule extends PlayerTurnRule {
  onRuleStart() {
    const actions = this.material(MaterialType.ActionCard).location(
      LocationType.ActionZone
    );
    if (actions.length === 0) {
      return [this.startRule(RuleId.RoundEnd)];
    }
    const playerPile = actions.player(this.player).deck();

    const action = playerPile.getItem<ActionCardId>()?.id?.front;
    if (action === undefined) {
      return [];
    }
    console.log(action);

    return [
      playerPile.dealOne({
        type: LocationType.ShootingZone,
      }),
      this.startPlayerTurn(RuleId.Shooting, this.nextPlayer),
    ];
  }
}
