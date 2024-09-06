/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Character } from '@gamepark/colt-super-express/Character'
import { PlayerPanel, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { createPortal } from 'react-dom'

export const PlayerPanels: FC<any> = () => {
  const players = usePlayers({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) =>
        <PlayerPanel key={player.id} playerId={player.id} color={playerColorCode[player.id]} css={panelPosition(index)}/>
      )}
    </>,
    root
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
  height: 14em;
`

export const playerColorCode: Record<Character, string> = {
  [Character.Belle]: 'purple',
  [Character.Cheyenne]: 'green',
  [Character.Django]: 'black',
  [Character.Doc]: 'blue',
  [Character.Ghost]: 'beige',
  [Character.Mei]: 'yellow',
  [Character.Tuco]: 'red'
}