import { PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { ActionCardId, getAction } from "../material/ActionCard";
import { RuleId } from "./RuleId";
import { Action } from "../material/Action";
import { WagonFloor } from "../material/WagonFloor";

export class ShootingRule extends PlayerTurnRule {
  onRuleStart() {
    const actions = this.material(MaterialType.ActionCard).location(
      LocationType.ActionZone
    );
    if (actions.length === 0) {
      return [this.startRule(RuleId.RoundEnd)];
    }
    const playerPile = actions.player(this.player).deck();

    const actionCard = playerPile.getItem<ActionCardId>()?.id?.front;
    if (actionCard === undefined) {
      return [];
    }

    return [
      playerPile.dealOne({
        type: LocationType.ShootingZone,
      }),
      ...this.applyActionEffect(getAction(actionCard)),
      this.startPlayerTurn(RuleId.Shooting, this.nextPlayer),
    ];
  }

  get banditFigure() {
    return this.material(MaterialType.BanditFigure).id(this.player);
  }

  moveAction() {
    const banditFigure = this.banditFigure;
    const banditLocation = banditFigure.getItem()!.location;
    const trainCardX = this.material(MaterialType.TrainCard).getItem(
      banditLocation.parent!
    ).location.x!;
    const nextTrainCardX = banditLocation.rotation.facingLocomotive
      ? trainCardX - 1
      : trainCardX + 1;
    const nextTrainCard = this.material(MaterialType.TrainCard)
      .location(LocationType.TrainLine)
      .location((location) => location.x === nextTrainCardX);
    const banditLocationId = banditFigure.getItem()?.location.id;

    return [
      banditFigure.moveItem({
        id: banditLocationId,
        type: LocationType.InTrainBanditZone,
        parent: nextTrainCard.getIndex(),
        rotation: banditLocation.rotation,
        x: banditLocation.rotation.facingLocomotive ? undefined : 0,
      }),
    ];
  }

  flipAction() {
    const banditFigure = this.banditFigure;

    return [
      banditFigure.moveItem((item) => ({
        ...item.location,
        rotation: {
          stunned: false,
          facingLocomotive: !item.location.rotation.facingLocomotive,
        },
      })),
    ];
  }

  changeFloorAction() {
    const banditFigure = this.banditFigure;
    const banditLocationId = banditFigure.getItem()?.location.id;
    const banditLocationNewId =
      banditLocationId === WagonFloor.InsideTrainCar
        ? WagonFloor.OntoTheroof
        : WagonFloor.InsideTrainCar;

    return [
      banditFigure.moveItem((item) => ({
        ...item.location,
        id: banditLocationNewId,
        x: item.location.rotation.facingLocomotive ? undefined : 0,
      })),
    ];
  }

  /*getBanditBefore(...)
  idem que getBanditAfter en x décroissant

getBanditAfter(...)
  let wagonX = myWagonX
  while (wagonX <= maxWagonX) {
    const banditCount = //count bandits in same location area
    let banditX = wagonX === myWagonX ? myBanditX +1 : 0
    while (banditX < banditCount) {
      if (!bandit is stunned) return bandit
    }
    wagonX--
  }
  return undefined
  
  this.material(...).sort(item => item.location.x!)
  */
  /*  1) Regarder dans quel sens est le bandit
        => si le bandit est vers la locomotive :
          - regarde le x de ton wagon et boucler sur tous les x des wagons en partant sur celui là :
            - voir s'il y a des bandits non stunned sur la carte et au même niveau:
              - Si LE wagon que l'on regarde est le wagon du player, on filtre les plus petits (location.x) que le bandit du joueur (pas de filtre sur les autres wagons)
                -s'il reste des bandits on prend le maxBy(item => item.location.x!) => return pour sortir de la fonction

        => si le bandit est vers la queue du train :
  */
  /* Pour récupérer tous les bandits qui sont sur une carte en particulier, il faut faire :
  const trainCardIndex = this.material(MaterialType.TrainCard).location(l => l.x === x)
  bandits = this.material(MaterialType.Bandit)
    .location(LocationType.InTrainBanditZone)
    .parent(trainCardIndex);*/
  get getBanditAfter() {
    const banditFigure = this.banditFigure;
    const banditLocation = banditFigure.getItem()!.location;
    const trainCard = this.material(MaterialType.TrainCard).getItem(
      banditLocation.parent!
    ).location.x!;
    const maxWagonX = this.material(MaterialType.TrainCard).getItems().length;

    const banditsOnSameCardPlayer = this.material(MaterialType.BanditFigure)
      .location(LocationType.InTrainBanditZone)
      .parent(banditLocation.parent)
      .filter(
        (bandit) =>
          !bandit.location.rotation.stunned &&
          bandit.location.rotation.id === banditLocation.rotation.id
      );

    if (banditsOnSameCardPlayer.length >= 2) {
      console.log(banditsOnSameCardPlayer.getItems());
      const banditsAfterplayer = banditsOnSameCardPlayer.filter(
        (bandit) => bandit.location.x! > banditLocation.x!
      );
      if (banditsAfterplayer.length > 0) {
        return banditsAfterplayer.maxBy((bandit) => bandit.location.x!);
      }
    }

    for (let x = trainCard + 1; x <= maxWagonX; x++) {
      const nextTrainCardIndex = this.material(MaterialType.TrainCard)
        .location((l) => l.x === x)
        .getIndex();
      const banditsOnNextCard = this.material(MaterialType.BanditFigure)
        .location(LocationType.InTrainBanditZone)
        .parent(nextTrainCardIndex)
        .filter(
          (bandit) =>
            !bandit.location.rotation.stunned &&
            bandit.location.rotation.id === banditLocation.rotation.id
        );
      if (banditsOnNextCard.length > 0) {
        return banditsOnNextCard.maxBy((bandit) => bandit.location.x!);
      }
    }
    return;
  }

  get getBanditBefore() {
      const banditFigure = this.banditFigure;
      const banditLocation = banditFigure.getItem()!.location;
      const trainCard = this.material(MaterialType.TrainCard).getItem(
        banditLocation.parent!
      ).location.x!;

      const banditsOnSameCardPlayer = this.material(MaterialType.BanditFigure)
        .location(LocationType.InTrainBanditZone)
        .parent(banditLocation.parent)
        .filter(
          (bandit) =>
            !bandit.location.rotation.stunned &&
            bandit.location.rotation.id === banditLocation.rotation.id
        );

      if (banditsOnSameCardPlayer.length >= 2) {
        console.log(banditsOnSameCardPlayer.getItems());
        const banditsAfterplayer = banditsOnSameCardPlayer.filter(
          (bandit) => bandit.location.x! < banditLocation.x!
        );
        if (banditsAfterplayer.length > 0) {
          return banditsAfterplayer.maxBy((bandit) => bandit.location.x!);
        }
    }
      for (let x = trainCard - 1; x >= 0; x--) {
        const nextTrainCardIndex = this.material(MaterialType.TrainCard)
          .location((l) => l.x === x)
          .getIndex();
        const banditsOnNextCard = this.material(MaterialType.BanditFigure)
          .location(LocationType.InTrainBanditZone)
          .parent(nextTrainCardIndex)
          .filter(
            (bandit) =>
              !bandit.location.rotation.stunned &&
              bandit.location.rotation.id === banditLocation.rotation.id
          );
        if (banditsOnNextCard.length > 0) {
          return banditsOnNextCard.minBy((bandit) => bandit.location.x!);
        }
      }
    return
  }

  fireAction() {
    const banditFigure = this.banditFigure;
    const banditLocation = banditFigure.getItem()!.location;
    console.log("action.fire");

    if (banditLocation.rotation.facingLocomotive) {
      if(this.getBanditBefore ){ const nextWagonCardBeforeX =
        this.getBanditBefore.getItem()?.location.parent! - 1;
      return [
        this.material(MaterialType.BanditFigure)
          .id(this.getBanditBefore.getItem()!.id)
          .moveItem((item) => ({
            ...item.location,
            parent: nextWagonCardBeforeX,
            rotation: {
              stunned: true,
            },
          })),
      ];}
      
    } else if (!banditLocation.rotation.facingLocomotive) {
      if (this.getBanditAfter) {
        const nextWagonCardAfterX =
          this.getBanditAfter.getItem()?.location.parent! + 1;
        return [
          this.material(MaterialType.BanditFigure)
            .id(this.getBanditAfter.getItem()!.id)
            .moveItem((item) => ({
              ...item.location,
              parent: nextWagonCardAfterX,
              rotation: {
                stunned: true,
              },
            })),
        ];
      }
    }

    return [];
  }

  applyActionEffect(action: Action) {
    switch (action) {
      case Action.Move:
        return this.moveAction();
        break;
      case Action.Flip:
        return this.flipAction();
        break;
      case Action.ChangeFloor:
        return this.changeFloorAction();
        break;
      case Action.Fire:
        return this.fireAction();
        break;
      default:
        break;
    }
    return [];
  }
}
