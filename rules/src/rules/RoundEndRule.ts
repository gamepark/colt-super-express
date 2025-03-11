import { MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { RuleId } from "./RuleId";
import { MaterialMove } from "@gamepark/rules-api";

export class RoundEndRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = [];
    const eliminatedPlayers: number[] = [];
    const firstPlayerCard = this.material(MaterialType.FirstPlayerCard);
    const currentPlayer = firstPlayerCard?.getItem()!.location.player;
    const players = this.game.players;
    const currentPlayerIndex = players.indexOf(currentPlayer!);
    const nextPlayer = players[(currentPlayerIndex + 1) % players.length];
    const actionCards = this.material(MaterialType.ActionCard).location(
      LocationType.ShootingZone,
    );

    moves.push(
      firstPlayerCard.moveItem((item) => ({
        ...item.location,
        player: nextPlayer,
      })),
    );

    const trainCards = this.material(MaterialType.TrainCard).getItems();
    if (trainCards.length > 1) {
      const lastTrainCard = this.material(MaterialType.TrainCard).location(
        (l) => l.x === trainCards.length,
      );
      if (
        this.material(MaterialType.BanditFigure).location(
          (l) => l.parent === lastTrainCard.getItem()?.location.x! - 1,
        ).length >= 1
      ) {
        eliminatedPlayers.push(
          this.material(MaterialType.BanditFigure)
            .location(
              (l) => l.parent === lastTrainCard.getItem()?.location.x! - 1,
            )
            .getItem()?.id,
        );
        const actionsCardToDelete = this.material(MaterialType.ActionCard)
          .filter(
            (card) =>
              card.location.player ===
              this.material(MaterialType.BanditFigure)
                .location(
                  (l) => l.parent === lastTrainCard.getItem()?.location.x! - 1,
                )
                .getItem()?.id,
          )
          .deleteItems();

        moves.push(...actionsCardToDelete);

        moves.push(
          this.material(MaterialType.BanditFigure)
            .location(
              (l) => l.parent === lastTrainCard.getItem()?.location.x! - 1,
            )
            .deleteItem(),
        );
      }
      moves.push(lastTrainCard.deleteItem());
    }

    const cardsToRange = actionCards.filter(
      (item) =>
        item.location.player !==
        this.material(MaterialType.BanditFigure)
          .location(
            (l) =>
              l.parent ===
              this.material(MaterialType.TrainCard)
                .location((l) => l.x === trainCards.length)
                .getItem()?.location.x! -
                1,
          )
          .getItem()?.id,
    );

    moves.push(
      ...cardsToRange.moveItems((item) => ({
        type: LocationType.PlayerHand,
        player: item.location.player,
      })),
    );

    const notEliminatedPlayers = players.filter(
      (player) => !eliminatedPlayers.includes(player),
    );

    moves.push(
      this.startSimultaneousRule(RuleId.Scheming, notEliminatedPlayers),
    );

    return moves;
  }
}
