import { MaterialType } from '@gamepark/colt-super-express/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { trainCardDescription } from './TrainCardDescription'
import { actionCardDescription } from './ActionCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
    [MaterialType.TrainCard]: trainCardDescription,
    [MaterialType.ActionCard]: actionCardDescription
}
