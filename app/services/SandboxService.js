import { AppState } from "../AppState.js"
import { DetailedSpell } from "../models/Spell.js";
import { api } from "./AxiosService.js"


class SandboxService {
  async prepareSpell(spellId) {
    console.log('service ☑️', spellId);
    const spellToUpdate = AppState.mySpells.find(spell => spell.id == spellId)
    console.log('☑️👉📜', spellToUpdate);

    // if (spellToUpdate.prepared) {
    //   spellToUpdate.prepared = false // change the properties you want changed
    // } else {
    //   spellToUpdate.prepared = true
    // }
    spellToUpdate.prepared = !spellToUpdate.prepared // bool flip

    // spellToUpdate.name = "Cool Spell"
    const response = await api.put(`api/spells/${spellId}`, spellToUpdate) // send it back to the API with a .put request
    console.log('☑️📜📡', response.data);
    AppState.emit('mySpells') // force the draw to happen again

  }
  setActiveSpell(spellId) {
    const selectedSpell = AppState.mySpells.find(spell => spell.id == spellId)
    AppState.activeSpell = selectedSpell
  }
  async fetchSandboxSpells() {
    const response = await api.get('api/spells')
    console.log('🥪📜📡', response.data);
    const spells = response.data.map(spellData => new DetailedSpell(spellData))
    console.log('🥪📜📜', spells);
    AppState.mySpells = spells
  }
  async saveSpell() {
    const spellToSave = AppState.activeSpell
    const response = await api.post('api/spells', spellToSave)
    console.log('📜💾📡', response.data);
    AppState.mySpells.push(new DetailedSpell(response.data))
  }

}

export const sandboxService = new SandboxService()