import { LocationType } from '@gamepark/colt-super-express/material/LocationType'
import { MaterialType } from '@gamepark/colt-super-express/material/MaterialType'
import { Character } from '@gamepark/colt-super-express/Character'
import { Locator } from '@gamepark/react-game'
import { trainLineLocator } from './TrainLineLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { banditFigureLocator } from './InTrainBanditZoneLocator'
import { firstPlayerLocator } from './FirstPlayerCardLocator'
import { actionZoneLocator } from './ActionZoneLocator'

export const Locators: Partial<Record<LocationType, Locator<Character, MaterialType, LocationType>>> = {
    [LocationType.TrainLine]: trainLineLocator,
    [LocationType.PlayerHand]: playerHandLocator,
    [LocationType.InTrainBanditZone]: banditFigureLocator,
    [LocationType.FirstPlayerCardZone]: firstPlayerLocator,
    [LocationType.ActionZone]: actionZoneLocator
}
