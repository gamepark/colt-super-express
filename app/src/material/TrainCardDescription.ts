import { CardDescription } from "@gamepark/react-game";
import Locomotive from "../images/Locomotive.jpg";
import Car from "../images/TrainCar.jpg"
import { LocationType } from "@gamepark/colt-super-express/material/LocationType";
import TrainCard301 from "../images/TrainCar301.jpg"
import TrainCard312 from "../images/TrainCar312.jpg"
import TrainCard323 from "../images/TrainCar323.jpg"
import TrainCard345 from "../images/TrainCar345.jpg"
import TrainCard356 from "../images/TrainCar356.jpg"
import TrainCard367 from "../images/TrainCar367.jpg"
import TrainCard378 from "../images/TrainCar378.jpg"
import TrainCard389 from "../images/TrainCar389.jpg"

class TrainCardDescription extends CardDescription {
    width = 8.8
    height = 6.35
    images = {
        0 : Locomotive,
        301: TrainCard301,
        312: TrainCard312,
        323: TrainCard323,
        345: TrainCard345,
        356: TrainCard356,
        367: TrainCard367,
        378: TrainCard378,
        389: TrainCard389,
    }

    backImage =  Car;
    
    staticItem =  {
      id: 0,
      location: {
        type: LocationType.TrainLine,
        x: 0,
      },
    }; 
}

export const trainCardDescription = new TrainCardDescription()