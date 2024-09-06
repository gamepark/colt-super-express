import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Character, characters } from './Character'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: Character }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type ColtSuperExpressOptions = {
  players: PlayerOptions[]
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const ColtSuperExpressOptionsSpec: OptionsSpec<ColtSuperExpressOptions> = {
  players: {
    id: {
      label: (t: TFunction) => t('Player color'),
      values: characters,
      valueSpec: color => ({ label: t => getPlayerName(color, t) })
    }
  }
}

export function getPlayerName(playerId: Character, t: TFunction) {
  switch (playerId) {
    case Character.Cheyenne:
      return t('Cheyenne')
    case Character.Belle:
      return t('Belle')
    case Character.Django:
      return t('Django')
    case Character.Doc:
      return t('Doc')
    case Character.Ghost:
      return t('Ghost')
    case Character.Mei:
      return t('Mei')
    case Character.Tuco:
      return t('Tuco')
  }
}