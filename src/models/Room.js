export default class Room {
  constructor (props = {}) {
    this.captures = props.captures || []
    this.dimensions = props.dimensions || {}
    this.id = props.id || `room-${Date.now()}`
    this.name = props.name || 'New Room'
    this.position = props.position || {}
  }
}
