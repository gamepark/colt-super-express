import { LocationType } from '@gamepark/colt-super-express/material/LocationType'
import { MaterialType } from '@gamepark/colt-super-express/material/MaterialType'
import { PlayerColor } from '@gamepark/colt-super-express/PlayerColor'
import { Locator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {}
