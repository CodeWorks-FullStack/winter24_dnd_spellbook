import { DetailedSpell, Spell } from './models/Spell.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {


  /** @type {Spell[]} spells from the dnd API */
  spells = []

  /** @type {DetailedSpell} the spell displayed in the center of the page*/
  activeSpell = null

  /** @type {DetailedSpell[]} spells you have saved to your own spell book*/
  mySpells = []

  user = null
  /**@type {import('./models/Account.js').Account | null} */
  account = null
}

export const AppState = createObservableProxy(new ObservableAppState())