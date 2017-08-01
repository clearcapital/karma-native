export default class Screenshot {
  constructor (props = {}) {
    this.fileName = props.fileName || undefined
    this.id = props.id || `screenshot-${Date.now()}`
    this.matrix = props.matrix || []
    this.name = props.name || 'New Screenshot'
    this.note = props.note || {}
    this.position = props.position || {}
  }
}
