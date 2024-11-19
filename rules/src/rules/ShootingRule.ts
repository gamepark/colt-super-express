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
  get getBanditAfter() {
    const banditFigure = this.banditFigure;
    const banditLocation = banditFigure.getItem()!.location;
    const trainCardX = this.material(MaterialType.TrainCard).getItem(
      banditLocation.parent!
    ).location.x!;
    const maxWagonX = this.material(MaterialType.TrainCard).getItems().length;
    let banditFound = false;

    for (let x = trainCardX - 1; x < maxWagonX; x++) {
      if (
        this.material(MaterialType.BanditFigure).filter(
          (bandit) =>
            bandit.location.parent === banditLocation.parent &&
            bandit.location.id === banditLocation.id &&
            !bandit.location.rotation.stunned
        ).length > 2
      ) {
        const banditsAfter = this.material(MaterialType.BanditFigure)
          .getItems()
          .filter(
            (bandit) =>
              bandit.location.x! > banditLocation.x! &&
              bandit.location.parent === banditLocation.parent &&
              bandit.location.id === banditLocation.id &&
              !bandit.location.rotation.stunned
          );
        if (banditsAfter.length >= 1) {
          console.log(
            "le bandit sur la même carte que le joueur actif à abattre est : "
          );
          console.log(
            this.material(MaterialType.BanditFigure)
              .getItems()
              .filter((bandit) => bandit.location.x! > banditLocation.x!)
              .sort((a, b) => a.location.x! - b.location.x!)
          );
          return this.material(MaterialType.BanditFigure)
            .getItems()
            .filter((bandit) => bandit.location.x! > banditLocation.x!)
            .sort((a, b) => a.location.x! - b.location.x!);
        }
        break;
      } else {
        for (let x = trainCardX; x < maxWagonX; x++) {
          const banditCount = this.material(MaterialType.BanditFigure).filter(
            (bandit) =>
              bandit.location.parent === x &&
              bandit.location.id === banditLocation.id &&
              !bandit.location.rotation.stunned
          ).length;

          if (banditCount >= 1) {
            const banditsafter = this.material(
              MaterialType.BanditFigure
            ).filter(
              (bandit) =>
                bandit.location.parent === x &&
                bandit.location.id === banditLocation.id &&
                !bandit.location.rotation.stunned
            );
            console.log(
              "le bandit à abattre sur une carte suivante après est le : "
            );
            console.log(
              banditsafter.maxBy((bandit) => bandit.location.x!).getItem()
            );

            banditFound = true;
            return banditsafter.maxBy((bandit) => bandit.location.x!).getItem();
          }
        }
      }
    }
    if (!banditFound) {
      console.log("Pas de bandits trouvés");
    }
    return;
  }

  get getBanditBefore() {
    console.log("before");

    return;
  }

  fireAction() {
    const banditFigure = this.banditFigure;
    const banditLocation = banditFigure.getItem()!.location;

    if (banditLocation.rotation.facingLocomotive) {
      this.getBanditBefore;
    } else {
      this.getBanditAfter;
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
