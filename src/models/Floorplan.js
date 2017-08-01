export default class Floorplan {
  constructor (props = {}) {
    this.name = props.name || 'New Floorplan'
    this.id = props.id || `floorplan-${Date.now()}`
    this.rooms = props.rooms || []
  }
}
