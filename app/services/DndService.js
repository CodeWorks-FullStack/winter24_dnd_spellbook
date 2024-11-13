
// NOTE we can create new axios wrappers for fetch, for each api we are reaching out to
// it will have an issue with axios (it is not available until load)

import { AppState } from "../AppState.js";
import { DetailedSpell, Spell } from "../models/Spell.js";

// @ts-ignore
const dndApi = axios.create({
  baseURL: 'https://www.dnd5eapi.co/api/'
})


class DndService {

  async fetchSpells() {
    // REVIEW errors that could be caught
    // // console.log(x) 
    // throw new Error("😱")

    // const response = await api.get('https://www.dnd5eapi.co/api/spells')
    const response = await dndApi.get('spells')
    console.log('🐉📜📡', response.data); // You will always have response.data
    // NOTE what comes after data is always unknown, until tested, check your log for the [{},{},{}]
    const spells = response.data.results.map(spellData => new Spell(spellData))
    // console.log('📜📜', spells);
    AppState.spells = spells
    // console.log('🗄️📜', AppState.spells);

  }

  async fetchActiveSpell(spellIndex) {
    const response = await dndApi.get(`spells/${spellIndex}`)
    // console.log('👉📜📡', response.data);
    const selectedSpell = new DetailedSpell(response.data)
    AppState.activeSpell = selectedSpell
    // console.log('🗄️👉📜', AppState.activeSpell);

  }

}

export const dndService = new DndService()