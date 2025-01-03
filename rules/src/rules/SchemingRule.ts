import {
  isMoveItem,
  ItemMove,
  MaterialMove,
  PlayMoveContext,
  SimultaneousRule,
} from "@gamepark/rules-api";
import { Bandit } from "../Bandit";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { RuleId } from "./RuleId";

export class SchemingRule extends SimultaneousRule {
  getActivePlayerLegalMoves(
    character: Bandit
  ): MaterialMove<number, number, number>[] {
    return this.material(MaterialType.ActionCard)
      .location(LocationType.PlayerHand)
      .player(character)
      .moveItems({ type: LocationType.ActionZone, player: character });
  }

  afterItemMove(
    move: ItemMove<number, number, number>,
    _context?: PlayMoveContext
  ): MaterialMove<number, number, number>[] {
    if (isMoveItem(move) && move.itemType === MaterialType.ActionCard) {
      if (
        this.material(MaterialType.ActionCard)
          .location(LocationType.ActionZone)
          .player(move.location.player).length === 3
      ) {
        return [this.endPlayerTurn(move.location.player!)];
      }
    }
    return [];
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    return [
      this.startPlayerTurn(
        RuleId.Shooting,
        this.material(MaterialType.FirstPlayerCard).getItem()!.location.player!
      ),
    ];
  }
}
