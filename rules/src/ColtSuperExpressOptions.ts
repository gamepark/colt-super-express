import { OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
import { Bandit, characters } from './Bandit'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: Bandit }

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
      label: (t: TFunction) => t('Bandit'),
      values: characters,
      valueSpec: color => ({ label: t => getPlayerName(color, t) })
    }
  }
}

export function getPlayerName(playerId: Bandit, t: TFunction) {
  switch (playerId) {
    case Bandit.Belle:
      return t('Belle')
    case Bandit.Cheyenne:
      return t('Cheyenne')
    case Bandit.Django:
      return t('Django')
    case Bandit.Doc:
      return t('Doc')
    case Bandit.Ghost:
      return t('Ghost')
    case Bandit.Mei:
      return t('Mei')
    case Bandit.Tuco:
      return t('Tuco')
  }
}