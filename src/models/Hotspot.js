export default class Hotspot {
  constructor (props = {}) {
    this.dimensions = props.dimensions || {}
    this.id = props.id || `hotspot-${Date.now()}`
    this.matrix = props.matrix || []
    this.meta = props.meta || {}
    this.position = props.position || {}
    this.rotation = props.rotation || {}
    this.type = props.type || undefined
  }
}
