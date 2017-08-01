import {
  ADD_CAPTURE,
  DELETE_CAPTURE,
  UPDATE_CAPTURE
} from '../constants/actionTypes'
import Capture from '../models/Capture'
import {updateRoom} from './roomActions'

export function addCapture (props, roomId) {
  const capture = new Capture(props)

  return dispatch => {
    dispatch({
      type: ADD_CAPTURE,
      payload: capture
    })

    if (roomId) {
      dispatch(updateRoom(roomId, {
        captures: [['add', capture.id]]
      }))
    }
  }
}

export function updateCapture (captureId, updates) {
  return {
    type: UPDATE_CAPTURE,
    payload: {captureId, updates}
  }
}

export function deleteCapture (captureId, roomId) {
  return dispatch => {
    dispatch({
      type: DELETE_CAPTURE,
      payload: captureId
    })

    if (roomId) {
      dispatch(updateRoom(roomId, {
        captures: [['delete', captureId]]
      }))
    }
  }
}
