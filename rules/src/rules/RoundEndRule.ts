import { MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { RuleId } from "./RuleId";
import { MaterialMove } from "@gamepark/rules-api";

export class RoundEndRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = [];

    const firstPlayerCard = this.material(MaterialType.FirstPlayerCard);
    const currentPlayer = firstPlayerCard?.getItem()!.location.player;
    const players = this.game.players;
    const currentPlayerIndex = players.indexOf(currentPlayer!);
    const nextPlayer = players[(currentPlayerIndex + 1) % players.length];
    const actionCards = this.material(MaterialType.ActionCard).location(
      LocationType.ShootingZone
    );

    moves.push(
      firstPlayerCard.moveItem((item) => ({
        ...item.location,
        player: nextPlayer,
      }))
    );

    const trainCards = this.material(MaterialType.TrainCard).getItems();
    if (trainCards.length > 1) {
      const lastTrainCard = this.material(MaterialType.TrainCard).location(
        (l) => l.x === trainCards.length
      );
      if (
        this.material(MaterialType.BanditFigure).location(
          (l) => l.parent === lastTrainCard.getItem()?.location.x! - 1
        ).length >= 1
      ) {
        // const actionsCardToDelete = this.material(MaterialType.ActionCard)
        //   .filter(
        //     (card) =>
        //       card.location.player ===
        //       this.material(MaterialType.BanditFigure)
        //         .location(
        //           (l) => l.parent === lastTrainCard.getItem()?.location.x! - 1
        //         )
        //         .getItem()?.id
        //   ).deleteItems()

        // moves.push(...actionsCardToDelete);

        moves.push(
          this.material(MaterialType.BanditFigure)
            .location(
              (l) => l.parent === lastTrainCard.getItem()?.location.x! - 1
            )
            .deleteItem()
        );
      }
      moves.push(lastTrainCard.deleteItem());
    }
// problème déplacer un objet qui n'éxiste plus, retirer les cartes delete
    moves.push(
      ...actionCards.moveItems((item) => ({
        type: LocationType.PlayerHand,
        player: item.location.player,
      }))
    );

    moves.push(this.startSimultaneousRule(RuleId.Scheming, this.game.players));

    return moves;
  }
}

//card firstplayer, prochain tour, enlever une carte du train
//startSimultaneuousRule ( nouveau tour) liste des joueurs actifs ( non éliminés )
// joueur qui perd, identifier le joueur éliminé ( remove de tous ses objets surtout la figurine)
