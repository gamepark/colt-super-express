import { MaterialType } from '@gamepark/colt-super-express/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { trainCardDescription } from './TrainCardDescription'
import { actionCardDescription } from './ActionCardDescription'
import { banditFigureDescription } from './BanditFigureDescription'
import { firstPlayerCardDescription } from './FirstPlayerCardDescription'
import { locomotiveCardDescription } from './LocomotiveCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
    [MaterialType.TrainCard]: trainCardDescription,
    [MaterialType.ActionCard]: actionCardDescription,
    [MaterialType.BanditFigure]: banditFigureDescription,
    [MaterialType.FirstPlayerCard]: firstPlayerCardDescription,
    [MaterialType.LocomotiveCard]: locomotiveCardDescription
}
