import { LocationType } from '@gamepark/colt-super-express/material/LocationType'
import { MaterialType } from '@gamepark/colt-super-express/material/MaterialType'
import { Character } from '@gamepark/colt-super-express/Character'
import { Locator } from '@gamepark/react-game'
import { trainLineLocator } from './TrainLineLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { banditFigureLocator } from './BanditFigureLocator'
import { firstPlayerLocator } from './FirstPlayerCardLocator'

export const Locators: Partial<Record<LocationType, Locator<Character, MaterialType, LocationType>>> = {
    [LocationType.TrainLine]: trainLineLocator,
    [LocationType.PlayerHand]: playerHandLocator,
    [LocationType.InTrainBanditZone]: banditFigureLocator,
    [LocationType.FirstPlayerCardZone]: firstPlayerLocator
}
