// verifier si le joueur est éliminé avant une action
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
      LocationType.ActionZone,
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

  /*  clearPlayerMaterials(playerId: number) {
    console.log("tu es mort");
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
  }*/

  clearPlayerMaterials(playerId: number) {
    console.log("tu es mort");
    return this.material(MaterialType.ActionCard)
      .filter((card) => card.location.player === playerId)
      .deleteItems()
      .concat(
        this.material(MaterialType.BanditFigure)
          .filter((item) => item.id === playerId)
          .deleteItem(),
      );
  }

  get banditFigure() {
    return this.material(MaterialType.BanditFigure).id(this.player);
  }

  /*  get isBanditStunned() {
    return this.material(MaterialType.BanditFigure).id(this.player).getItem()
      ?.location.rotation.stunned;
  }*/

  get isBanditStunned() {
    return this.banditFigure.getItem()?.location.rotation.stunned;
  }

  /*  get isBanditAlive() {
    return (
      this.material(MaterialType.BanditFigure).id(this.player).getItem() !==
      undefined
    );
  }*/

  get isBanditAlive() {
    return this.banditFigure.getItem() !== undefined;
  }

  moveAction() {
    if (!this.isBanditAlive) {
      console.log("Le bandit est éliminé, action annulée.");
      return [];
    }
    const isBanditStunned = this.isBanditStunned;
    const banditFigure = this.banditFigure;
    const banditFigureId = banditFigure.getItem()?.id;
    const banditLocation = banditFigure.getItem()!.location;
    const banditLocationId = banditFigure.getItem()?.location.id;
    // erreur banditLocation.parent n'existe pas
    const trainCardX = this.material(MaterialType.TrainCard).getItem(
      banditLocation.parent!,
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
        console.log("move-dead-1");
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
        console.log("move-death-2");
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
    if (!this.isBanditAlive) {
      console.log("Le bandit est éliminé, action annulée.");
      return [];
    }
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
    if (!this.isBanditAlive) {
      console.log("Le bandit est éliminé, action annulée.");
      return [];
    }
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
      banditLocation.parent!,
    ).location.x!;
    const maxWagonX = this.material(MaterialType.TrainCard).getItems().length;

    const banditsOnSameCardPlayer = this.material(MaterialType.BanditFigure)
      .location(LocationType.InTrainBanditZone)
      .parent(banditLocation.parent)
      .filter(
        (bandit) =>
          !bandit.location.rotation.stunned &&
          bandit.location.id === banditLocation.id,
      );

    // plus ou egal deux bandits sur meme cartes que bandit qui tire
    if (banditsOnSameCardPlayer.length >= 2) {
      const banditsAfterplayer = banditsOnSameCardPlayer.filter(
        (bandit) => bandit.location.x! > banditLocation.x!,
      );
      if (banditsAfterplayer.length > 0) {
        return banditsAfterplayer.minBy((bandit) => bandit.location.x!);
      }
    }

    // tir depuis la locomotive sur bandits sur la loco
    if (banditLocation.parent === undefined) {
      if (
        this.material(MaterialType.BanditFigure)
          .location(LocationType.InTrainBanditZone)
          .parent(undefined)
      ) {
        const banditsOnLoco = this.material(MaterialType.BanditFigure)
          .location(LocationType.InTrainBanditZone)
          .parent(undefined);

        if (banditsOnLoco.length >= 2) {
          const banditFound = banditsOnLoco.filter(
            (bandit) => bandit.location.x === banditLocation.x! + 1,
          );
          if (banditFound) {
            return banditFound;
          }
        }
      }
    }

    // tir depuis la loco sur bandits hors loco

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
            bandit.location.id === banditLocation.id,
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
      banditLocation.parent!,
    ).location.x!;

    const banditsOnSameCardPlayer = this.material(MaterialType.BanditFigure)
      .location(LocationType.InTrainBanditZone)
      .parent(banditLocation.parent)
      .filter(
        (bandit) =>
          !bandit.location.rotation.stunned &&
          bandit.location.id === banditLocation.id,
      );

    //tu es sur la loco et d'autres bandits sont avec toi et vers le sens de la loco
    if (banditLocation.parent === undefined) {
      const banditsOnLoco = this.material(MaterialType.BanditFigure)
        .location(LocationType.InTrainBanditZone)
        .parent(undefined);

      if (banditsOnLoco.getItems().length >= 2) {
        const banditLocationX = banditLocation.x;
        const banditFound = banditsOnLoco.filter(
          (b) => b.location.x === banditLocationX! - 1,
        );
        if (banditFound) {
          return banditFound;
        }
      }
    }

    if (
      this.material(MaterialType.TrainCard)
        .location((l) => l.x === trainCard - 1)
        .getItems().length === 0
    ) {
      const banditsOnNextCard = this.material(MaterialType.BanditFigure)
        .location(LocationType.InTrainBanditZone)
        .parent(undefined)
        .filter(
          (bandit) =>
            !bandit.location.rotation.stunned &&
            bandit.location.id === banditLocation.id,
        );
      if (banditsOnNextCard.length > 0) {
        return banditsOnNextCard.maxBy((bandit) => bandit.location.x!);
      }
    }
    if (banditsOnSameCardPlayer.length >= 2) {
      const banditsAfterplayer = banditsOnSameCardPlayer.filter(
        (bandit) => bandit.location.x! < banditLocation.x!,
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
            bandit.location.id === banditLocation.id,
        );
      if (banditsOnNextCard.length > 0) {
        return banditsOnNextCard.maxBy((bandit) => bandit.location.x!);
      }
    }
    return;
  }

  fireAction() {
    console.log(this.material(MaterialType.BanditFigure).getItems());
    console.log(this.material(MaterialType.TrainCard).getItems());
    if (!this.isBanditAlive) {
      console.log("Le bandit est éliminé, action annulée.");
      return [];
    }
    const isBanditStunned = this.isBanditStunned;
    const banditFigure = this.banditFigure;
    const banditLocation = banditFigure.getItem()!.location;
    const banditTargetAfter = this.getBanditAfter?.getItem()?.location.parent;
    const banditTargetBefore = this.getBanditBefore?.getItem()?.location.parent;
    const trainCardAfterX = this.material(MaterialType.TrainCard).getItem(
      banditTargetAfter!,
    ).location.x!;
    const trainCardBeforeX = this.material(MaterialType.TrainCard).getItem(
      banditTargetBefore!,
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
          bandit.location.id === banditLocation.id,
      )
      .getItems().length;

    if (!isBanditStunned) {
      //le bandit qui tire est sur la loco
      if (banditLocation.parent === undefined) {
        //le bandit qui tire est face à la loco
        if (banditLocation.rotation.facingLocomotive) {
          //il y a un banditbefore sur la loco qui est tué
          if (this.getBanditBefore) {
            console.log("fire-death-1");
            return this.clearPlayerMaterials(
              this.getBanditBefore?.getItem()?.id,
            );
          }
          //il n'y a pas de banditBefore
          else {
            return [];
          }
          //le bandit qui tire est sur la loco et n'est pas face à la locomotive
        } else if (!banditLocation.rotation.facingLocomotive) {
          //il y a un banditAfter
          if (this.getBanditAfter) {
            // le banditAfter est sur la dernière cart wagon, le tuer
            if (
              banditTargetAfter! + 1 ===
              this.material(MaterialType.TrainCard).getItems().length
            ) {
              return this.clearPlayerMaterials(
                this.getBanditAfter?.getItem()?.id,
              );
            }
            // le banditAfter n'est pas sur la dernière carte wagon
            else {
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
          } else {
            return [];
          }
        }
      } else if (
        banditLocation.rotation.facingLocomotive &&
        banditLocation.parent !== undefined
      ) {
        if (this.getBanditBefore) {
          if (this.getBanditBefore.getItem()?.location.parent === undefined) {
            console.log("fire-death-3");
            return this.clearPlayerMaterials(
              this.getBanditBefore!.getItem()?.id,
            );
          } else if (nextTrainCard.getIndex() === -1) {
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
      } else if (
        !banditLocation.rotation.facingLocomotive &&
        banditLocation.parent !== undefined
      ) {
        if (this.getBanditAfter) {
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
