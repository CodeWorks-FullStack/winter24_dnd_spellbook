import { AppState } from "../AppState.js";
import { dndService } from "../services/DndService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";



export class DndController {
  constructor() {
    console.log('🐉🎮');
    this.fetchSpells()
    AppState.on('spells', this.drawSpellList)
    AppState.on('activeSpell', this.drawActiveSpell)
  }

  async fetchSpells() {
    try {
      await dndService.fetchSpells()
    } catch (error) {
      console.error(error) // every catch should report to the console
      Pop.toast("Oh no! could not learn of the magic ways", 'error') // and report to the user
    }
  }

  // NOTE take the unique identifier of the spell, and send it to the service
  async fetchActiveSpell(spellIndex) {
    try {
      console.log('👉📜', spellIndex);
      await dndService.fetchActiveSpell(spellIndex)
    } catch (error) {
      console.error(error)
      Pop.toast("Whoops! Count not get that spell")
    }
  }

  // NOTE this still works, but is replaced with the setHTML version
  // drawSpellList() {
  //   console.log('✏️📜');
  //   const spellListElm = document.getElementById('spell-list')
  //   spellListElm.innerHTML = ''
  //   AppState.spells.forEach(spell => spellListElm.innerHTML += spell.name)
  // }
  drawSpellList() {
    console.log('✏️📜');
    let spellListHTML = ''
    AppState.spells.forEach(spell => spellListHTML += spell.ListTemplate)
    setHTML('spell-list', spellListHTML) // this handles errors with id's a little better
  }

  drawActiveSpell() {
    console.log('✏️👉📜');
    setHTML('active-spell', AppState.activeSpell.ActiveCard)
  }
}