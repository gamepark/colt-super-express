import { MaterialType } from '@gamepark/colt-super-express/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { trainCardDescription } from './TrainCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
    [MaterialType.TrainCard]: trainCardDescription
}
