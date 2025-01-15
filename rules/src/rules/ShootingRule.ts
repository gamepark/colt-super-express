import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
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
        player: this.player,
      }),
      ...this.applyActionEffect(getAction(actionCard)),
      this.startPlayerTurn(RuleId.Shooting, this.nextPlayer),
    ];
  }

  clearPlayerMaterials(playerId: number) {
    const moves: MaterialMove[] = [];

    const actionCardsDelete = this.material(MaterialType.ActionCard)
      .filter((card) => card.location.player === playerId)
      .deleteItems();
    moves.push(...actionCardsDelete);

    const banditFiguredelete = this.material(MaterialType.BanditFigure)
      .filter((item) => item.id === playerId)
      .deleteItem();
    moves.push(banditFiguredelete);

    return moves;
  }

  get banditFigure() {
    return this.material(MaterialType.BanditFigure).id(this.player);
  }

  get isBanditStunned() {
    return this.material(MaterialType.BanditFigure).id(this.player).getItem()
      ?.location.rotation.stunned;
  }

  moveAction() {
    const isBanditStunned = this.isBanditStunned;
    const banditFigure = this.banditFigure;
    const banditFigureId = banditFigure.getItem()?.id;
    const banditLocation = banditFigure.getItem()!.location;
    const banditLocationId = banditFigure.getItem()?.location.id;

    const trainCardX = this.material(MaterialType.TrainCard).getItem(
      banditLocation.parent!
    ).location.x!;
    const nextTrainCardX = banditLocation.rotation.facingLocomotive
      ? trainCardX - 1
      : trainCardX + 1;
    const nextTrainCard = this.material(MaterialType.TrainCard)
      .location(LocationType.TrainLine)
      .location((location) => location.x === nextTrainCardX);

    if (!isBanditStunned) {
      if (
        banditLocation.parent === undefined &&
        banditLocation.rotation.facingLocomotive
      ) {
        return this.clearPlayerMaterials(banditFigureId);
      } else if (
        nextTrainCard.getIndex() === -1 &&
        banditFigure.getItem()?.location.parent !==
          this.material(MaterialType.TrainCard).length - 1
      ) {
        return [
          banditFigure.moveItem({
            id: banditLocationId,
            type: LocationType.InTrainBanditZone,
            parent: undefined,
            rotation: banditLocation.rotation,
            x: banditLocation.rotation.facingLocomotive ? undefined : 0,
          }),
        ];
      } else if (
        banditFigure.getItem()?.location.parent === undefined &&
        !banditLocation.rotation.facingLocomotive
      ) {
        return [
          banditFigure.moveItem({
            id: banditLocationId,
            type: LocationType.InTrainBanditZone,
            parent: 0,
            rotation: banditLocation.rotation,
            x: banditLocation.rotation.facingLocomotive ? undefined : 0,
          }),
        ];
      } else if (
        nextTrainCard.getIndex() === -1 &&
        banditFigure.getItem()?.location.parent ===
          this.material(MaterialType.TrainCard).length - 1
      ) {
        return this.clearPlayerMaterials(banditFigureId);
      } else {
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
    } else {
      return [
        banditFigure.moveItem((item) => ({
          ...item.location,
          rotation: {
            ...item.location.rotation,
            stunned: false,
          },
        })),
      ];
    }
  }

  flipAction() {
    const banditFigure = this.banditFigure;
    const isBanditStunned = this.isBanditStunned;
    if (!isBanditStunned) {
      return [
        banditFigure.moveItem((item) => ({
          ...item.location,
          rotation: {
            stunned: false,
            facingLocomotive: !item.location.rotation.facingLocomotive,
          },
        })),
      ];
    } else {
      return [
        banditFigure.moveItem((item) => ({
          ...item.location,
          rotation: {
            ...item.location.rotation,
            stunned: false,
          },
        })),
      ];
    }
  }

  changeFloorAction() {
    const isBanditStunned = this.isBanditStunned;
    const banditFigure = this.banditFigure;
    const banditLocationId = banditFigure.getItem()?.location.id;
    const banditLocationNewId =
      banditLocationId === WagonFloor.InsideTrainCar
        ? WagonFloor.OntoTheroof
        : WagonFloor.InsideTrainCar;

    if (!isBanditStunned) {
      return [
        banditFigure.moveItem((item) => ({
          ...item.location,
          id: banditLocationNewId,
          x: item.location.rotation.facingLocomotive ? undefined : 0,
        })),
      ];
    } else {
      return [
        banditFigure.moveItem((item) => ({
          ...item.location,
          rotation: {
            ...item.location.rotation,
            stunned: false,
          },
        })),
      ];
    }
  }

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
          bandit.location.id === banditLocation.id
      );

    if (banditsOnSameCardPlayer.length >= 2) {
      const banditsAfterplayer = banditsOnSameCardPlayer.filter(
        (bandit) => bandit.location.x! > banditLocation.x!
      );
      if (banditsAfterplayer.length > 0) {
        return banditsAfterplayer.minBy((bandit) => bandit.location.x!);
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
            bandit.location.id === banditLocation.id
        );
      if (banditsOnNextCard.length > 0) {
        return banditsOnNextCard.minBy((bandit) => bandit.location.x!);
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
          bandit.location.id === banditLocation.id
      );

    if (banditsOnSameCardPlayer.length >= 2) {
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
            bandit.location.id === banditLocation.id
        );
      if (banditsOnNextCard.length > 0) {
        return banditsOnNextCard.maxBy((bandit) => bandit.location.x!);
      }
    }
    return;
  }

  fireAction() {
    console.log("fireAction");

    const isBanditStunned = this.isBanditStunned;
    const banditFigure = this.banditFigure;
    const banditLocation = banditFigure.getItem()!.location;
    const banditTargetAfter = this.getBanditAfter?.getItem()?.location.parent;
    const banditTargetBefore = this.getBanditBefore?.getItem()?.location.parent;
    const trainCardAfterX = this.material(MaterialType.TrainCard).getItem(
      banditTargetAfter!
    ).location.x!;
    const trainCardBeforeX = this.material(MaterialType.TrainCard).getItem(
      banditTargetBefore!
    ).location.x!;
    const nextTrainCardX = banditLocation.rotation.facingLocomotive
      ? trainCardBeforeX - 1
      : trainCardAfterX + 1;
    const nextTrainCard = this.material(MaterialType.TrainCard)
      .location(LocationType.TrainLine)
      .location((location) => location.x === nextTrainCardX);
    const banditsTargetNewLocationX = this.material(MaterialType.BanditFigure)
      .filter(
        (bandit) =>
          bandit.location.parent === nextTrainCard.getIndex() &&
          bandit.location.id === banditLocation.id
      )
      .getItems().length;

    if (!isBanditStunned) {
      if (banditLocation.rotation.facingLocomotive) {
        if (this.getBanditBefore) {
          if (this.getBanditBefore.getItem()?.location.parent === undefined) {
            console.log("bandit à tuer sur loco");
            return this.clearPlayerMaterials(
              this.getBanditBefore.getItem()?.id
            );
          } else if (nextTrainCard.getIndex() === -1) {
            console.log("bandit à tuer envoyé sur loco");
            return [
              this.material(MaterialType.BanditFigure)
                .id(this.getBanditBefore.getItem()!.id)
                .moveItem((item) => ({
                  ...item.location,
                  parent: undefined,
                  rotation: {
                    ...item.location.rotation,
                    stunned: true,
                  },
                })),
            ];
          } else {
            console.log("bandit à tuer juste avant go");
            console.log(this.getBanditBefore.getItem());
            return [
              this.material(MaterialType.BanditFigure)
                .id(this.getBanditBefore.getItem()!.id)
                .moveItem((item) => ({
                  ...item.location,
                  parent: nextTrainCard.getIndex(),
                  rotation: {
                    ...item.location.rotation,
                    stunned: true,
                  },
                  x: banditsTargetNewLocationX,
                })),
            ];
          }
        }
      } else if (!banditLocation.rotation.facingLocomotive) {
        if (this.getBanditAfter) {
          console.log("bandit après");
          return [
            this.material(MaterialType.BanditFigure)
              .id(this.getBanditAfter.getItem()!.id)
              .moveItem((item) => ({
                ...item.location,
                parent: nextTrainCard.getIndex(),
                rotation: {
                  ...item.location.rotation,
                  stunned: true,
                },
                x: 0,
              })),
          ];
        }
      }
    } else {
      return [
        banditFigure.moveItem((item) => ({
          ...item.location,
          rotation: {
            ...item.location.rotation,
            stunned: false,
          },
        })),
      ];
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
