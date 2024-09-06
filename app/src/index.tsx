/** @jsxImportSource @emotion/react */
import { ColtSuperExpressOptionsSpec } from '@gamepark/colt-super-express/ColtSuperExpressOptions'
import { ColtSuperExpressRules } from '@gamepark/colt-super-express/ColtSuperExpressRules'
import { ColtSuperExpressSetup } from '@gamepark/colt-super-express/ColtSuperExpressSetup'
import { GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider game="colt-super-express" Rules={ColtSuperExpressRules} optionsSpec={ColtSuperExpressOptionsSpec} GameSetup={ColtSuperExpressSetup}
                  material={Material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
