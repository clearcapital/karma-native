import {
  ADD_HOTSPOT,
  DELETE_HOTSPOT,
  UPDATE_HOTSPOT
} from '../constants/actionTypes'
import Hotspot from '../models/Hotspot'
import {updateCapture} from './captureActions'

export function addHotspot (props, captureId) {
  const hotspot = new Hotspot(props)

  return dispatch => {
    dispatch({
      type: ADD_HOTSPOT,
      payload: hotspot
    })

    if (captureId) {
      dispatch(updateCapture(captureId, {
        hotspot: [['add', hotspot.id]]
      }))
    }
  }
}

export function updateHotspot (hotspotId, updates) {
  return {
    type: UPDATE_HOTSPOT,
    payload: {hotspotId, updates}
  }
}

export function deleteHotspot (hotspotId, captureId) {
  return dispatch => {
    dispatch({
      type: DELETE_HOTSPOT,
      payload: hotspotId
    })

    if (captureId) {
      dispatch(updateCapture(captureId, {
        hotspot: [['delete', hotspotId]]
      }))
    }
  }
}
