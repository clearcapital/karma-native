export default class Capture {
  constructor (props = {}) {
    this.date = props.date || new Date()
    this.fileName = props.fileName || undefined
    this.hotspots = props.hotspots || []
    this.id = props.id || `capture-${Date.now()}`
    this.name = props.name || `New Capture`
    this.note = props.note || {}
    this.position = props.position || {}
    this.screenshots = props.screenshots || []
  }
}
