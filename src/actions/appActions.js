import {
  ACTIVE_CAPTURE,
  ACTIVE_FLOORPLAN,
  ACTIVE_HOTSPOT,
  ACTIVE_ROOM,
  ACTIVE_ROTATION,
  LOADING,
  RESET_APP,
  SETTING_AUTO_SAVE,
  SETTING_INVERT_CONTROLS
} from '../constants/actionTypes'

export function setActiveFloorPlan (id) {
  return {
    type: ACTIVE_FLOORPLAN,
    payload: id
  }
}

export function setActiveRoomId (id) {
  return {
    type: ACTIVE_ROOM,
    payload: id
  }
}

export function setActiveCaptureId (id) {
  return {
    type: ACTIVE_CAPTURE,
    payload: id
  }
}

export function setActiveHotspotId (id) {
  return {
    type: ACTIVE_HOTSPOT,
    payload: id
  }
}

export function setRotation (rotation) {
  return {
    type: ACTIVE_ROTATION,
    payload: rotation
  }
}

export function setActiveRoomCapture (roomId, captureId) {
  return [
    setRotation(null),
    setActiveRoomId(roomId),
    setActiveCaptureId(captureId)
  ]
}

export function gotoHotspot (roomId, captureId, hotspot) {
  return [
    setActiveRoomId(roomId),
    setActiveCaptureId(captureId),
    setRotation(hotspot.rotation)
  ]
}

export function setInvertControls (inverted) {
  return {
    type: SETTING_INVERT_CONTROLS,
    payload: inverted
  }
}

export function setAutoSave (enabled) {
  return {
    type: SETTING_AUTO_SAVE,
    payload: enabled
  }
}

export function saveState () {
  return (dispatch, getState) => {
    // const state = getState()
    // const stateToSave = {
    //   id: state.id,
    //   floorplans: state.floorplans,
    //   rooms: state.rooms
    // }

    // api.put(`properties/${state.id}`, stateToSave).then(
    //   response => {},
    //   err => { console.error(err) }
    // )
  }
}

export function setSpinner (spinning) {
  return {
    type: LOADING,
    payload: spinning
  }
}

export function resetState () {
  return { type: RESET_APP }
}
