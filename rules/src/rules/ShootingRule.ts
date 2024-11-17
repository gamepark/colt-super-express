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

  /*
- Regarder dans quel sens est orienté le bandit
 Si le bandit est tourné vers la locomotive et inversement :
    - trouver la carte où se trouve le player ayant fait l'action de tire
    - relever une liste des cartes à suivre, carte où se trouve le bandit du player incluse
    - trouver la première carte contentant un ou plusieurs bandits non stunned
    - lister les bandits sur la carte en fonction de leur x
    - tirer sur le bandit le plus proche du bandit player
  */

  fireAction() {
    const banditFigure = this.banditFigure;
    const isBanditFigureFacingLocomotive =
      banditFigure.getItem()?.location.rotation.facingLocomotive;
    const getBanditAfter = () => {
      const maxWagon = this.material(MaterialType.TrainCard).getItems();
      const trainCardX = this.material(MaterialType.TrainCard)
        .location((l) => l.x === banditFigure.getItem()?.location.parent! + 1)
        .getItem()?.location.x;
      if (
        this.material(MaterialType.BanditFigure).filter(
          (bandits) => bandits.location.parent! + 1 === trainCardX
        ).length >= 2
      ) {
        console.log(banditFigure.getItem());
        console.log(
          this.material(MaterialType.BanditFigure)
            .location((l) => l.parent! + 1 === trainCardX)
            .getItems()
        );

        if (
          this.material(MaterialType.BanditFigure)
            .location((l) => l.parent! + 1 === trainCardX)
            .getItems()
            .filter(
              (bandit) =>
                bandit.location.x! > banditFigure.getItem()?.location.x!
            ).length !== 0
        ) {
          const nextTrainCardX = this.material(MaterialType.TrainCard)
            .location(
              (l) => l.x === banditFigure.getItem()?.location.parent! + 2
            )
            .getIndex();

          this.material(MaterialType.BanditFigure)
            .location((l) => l.x! === banditFigure.getItem()?.location.x)
            .moveItem((item) => ({
              ...item.location,
              parent: nextTrainCardX,
            }));
        }
      } else {
        console.log(maxWagon);
        for (let x = trainCardX; x! <= maxWagon.length; x!++) {
          console.log(x);
        }
      }
    };
    const getBanditBefore = () => {
      console.log("before");
    };

    if (isBanditFigureFacingLocomotive) {
      getBanditBefore();
    } else {
      getBanditAfter();
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
