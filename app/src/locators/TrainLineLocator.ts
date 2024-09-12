import { ListLocator, MaterialContext } from "@gamepark/react-game";
import { trainCardDescription } from "../material/TrainCardDescription";
import {  Location } from "@gamepark/rules-api";

class TrainLineLocator extends ListLocator {
  gap = {
    x: -trainCardDescription.width,
  };

  getLocationCoordinates(
    location: Location,
    context: MaterialContext,
      index = this.getLocationIndex(location, context)  
  ) {
     
    if (index === undefined) return this.getAreaCoordinates(location, context);

    const { x = 0, y = 0, z = 0 } = this.getCoordinates(location, context);
    const {
      x: gx = 0,
      y: gy = 0,
      z: gz =0,
    } = this.getGap(location, context);
    const { x: mgx, y: mgy, z: mgz } = this.getMaxGap(location, context);
    const count = this.countListItems(location, context);

   
    const totalWidth = (count - 1) * gx;
    const centeredX = x - totalWidth / 2; 

    return {
      x:
        centeredX +
        index *
          (mgx && count > 1 ? mgx * Math.min(gx / mgx, 1 / (count - 1)) : gx),
      y:
        y +
        index *
          (mgy && count > 1 ? mgy * Math.min(gy / mgy, 1 / (count - 1)) : gy),
      z:
        z +
        index *
          (mgz && count > 1 ? mgz * Math.min(gz / mgz, 1 / (count - 1)) : gz),
    };
  }
}

export const trainLineLocator = new TrainLineLocator()