import { AppState } from "../AppState.js";
import { sandboxService } from "../services/SandboxService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";


export class SandboxController {
  constructor() {
    console.log('🥪🎮');
    // this.fetchSandboxSpells() // asking for this user's spells immediately is too quick, and we get a 401
    AppState.on('account', this.fetchSandboxSpells) // we need this fetch to listen for the account, so it only happens AFTER someone is logged in
    AppState.on('mySpells', this.drawSandboxSpellList)
  }



  async fetchSandboxSpells() {
    try {
      await sandboxService.fetchSandboxSpells()
    } catch (error) {
      console.error(error)
      Pop.toast("Could not get your spells, master wizard", 'error')
    }
  }

  async saveSpell() {
    try {
      console.log('💾📜');
      await sandboxService.saveSpell()
      Pop.toast("Spell Saved", 'success')
    } catch (error) {
      console.error(error)
      Pop.toast("Could not save spell", 'error')
    }
  }

  async prepareSpell(spellId) {
    try {
      console.log('☑️', spellId);
      sandboxService.prepareSpell(spellId)
    } catch (error) {
      console.error(error)
      Pop.toast("Could not prepare spell", 'error')
    }
  }

  setActiveSpell(spellId) {
    sandboxService.setActiveSpell(spellId)
  }

  drawSandboxSpellList() {
    let sandboxSpellHTML = ''
    AppState.mySpells.forEach(spell => sandboxSpellHTML += spell.mySpellListTemplate)
    setHTML('sandbox-spell-list', sandboxSpellHTML)
    let preparedSpells = AppState.mySpells.filter(spell => spell.prepared == true)
    setText('spell-count', `${preparedSpells.length}/8`)
  }
}