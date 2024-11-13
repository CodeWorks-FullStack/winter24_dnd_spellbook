


export class Spell {
  constructor(data) {
    this.index = data.index
    this.name = data.name
    this.url = data.url
    this.level = data.level

    // this.desc = data.desc
    // this.material = data.material
  }

  get ListTemplate() {
    return `
    <div onclick="app.DndController.fetchActiveSpell('${this.index}')"  class="selectable text-danger p-2 rounded" role="button">
      <div class="text-dark">${this.name}</div>
    </div>
    `
  }
}

export class DetailedSpell extends Spell {
  constructor(data) {
    super(data) // When extending a class, you need to invoke, the constructor, of the BASE class using super
    this.description = data.description || data.desc.join('<br><br>')
    this.material = data.material || '<i>no material required</i>'
    this.concentration = data.concentration
    this.ritual = data.ritual
    this.duration = data.duration
    this.range = data.range
    this.castingTime = data.castingTime || data.casting_time // taking in either format from sandbox or dnd api
    this.school = data.school?.name // what if it dosn't have a property, you want to dig into?
    this.components = data.components
    // TODO this will be the bane of our existence
    this.damage = this.constructDamage(data.damage)
    // id is only present on the sandbox version
    this.id = data.id || null
    this.prepared = data.prepared || false
  }

  get ActiveCard() {
    return `
    <div class="card sticky-top">
          <div class="card-body">
            <h2 class="text-center text-uppercase">${this.name} <sup title="Spell level"> ${this.level}</sup>
            </h2>
            ${this.ConcentrationBubble}${this.RitualBubble}
            <div class="d-flex justify-content-between">
              <span>${this.school}</span> <span>${this.castingTime}</span><span>${this.duration}</span>
            </div>
            <p class="text-center fw-bold my-1">${this.damage}</p>
            <hr>
            <p>${this.description}</p>
            <hr>
            <div class="d-flex justify-content-between">
              <span>${this.components}</span> <span>${this.material}</span>
            </div>
            <div class="text-end">
            <button onclick="app.SandboxController.saveSpell()" class="btn btn-danger">Save To Spell Book</button>
            </div>
          </div>
        </div>
    `
  }

  get mySpellListTemplate() {
    return `
    <div onclick="app.SandboxController.setActiveSpell('${this.id}')" class="text-primary selectable p-2 rounded d-flex">
      <input onchange="app.SandboxController.prepareSpell('${this.id}')" ${this.isChecked} type="checkbox"> <div class="ms-2 text-dark">${this.name}</div>
    </div>
    `
  }

  constructDamage(damage) {
    if (!damage) return 'no damage' // if there is no damage
    if (typeof damage == 'string') return damage // if it's already flattened
    if (this.level > 0) { // if the damage, is calculated from spell level
      return damage.damage_type.name + ' ' + damage.damage_at_slot_level[this.level]
    }
    // if damage is calculated from character level
    return damage.damage_type.name + ' ' + damage.damage_at_character_level[1]
  }

  get ConcentrationBubble() {
    if (this.concentration) {
      return `<span class="bg-primary text-light px-2 rounded-pill" title="requires concentration">concentration <i class="mdi mdi-head-flash"></i> </span>`
    }
    return `<span class="border border-primary px-2 rounded-pill" title="no concentration required">concentration <i class="mdi mdi-head-minus"></i></span>`
  }

  get RitualBubble() {
    if (this.ritual) {
      return `<span class="bg-warning text-light px-2 rounded-pill" title="cast as ritual">ritual <i class="mdi mdi-creation"></i> </span>`
    }
    return `<span class="border border-warning px-2 rounded-pill" title="not cast as ritual">ritual <i class="mdi mdi-creation"></i></span>`
  }

  get isChecked() {
    if (this.prepared) return 'checked'
    return ''
  }
}