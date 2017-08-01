import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_CAPTURE,
  DELETE_CAPTURE,
  UPDATE_CAPTURE
} from '../constants/actionTypes'
import listUtils from '../services/listUtils'

// Array of Capture ()
const initialState = []

export default function captures (state = initialState, action) {
  switch (action.type) {
    case ADD_CAPTURE:
      return addCapture(state, action.payload)
    case DELETE_CAPTURE:
      return deleteCapture(state, action.payload)
    case UPDATE_CAPTURE:
      const {captureId, updates} = action.payload
      return updateCapture(state, captureId, updates)
    default:
      return state
  }
}

function addCapture (state, capture) {
  const captures = cloneDeep(state)
  captures.push(capture)
  return captures
}

function updateCapture (state, captureId, updates) {
  const captures = cloneDeep(state)
  const capture = captures.find(capture => capture.id === captureId)

  if (capture && updates) {
    Object.keys(updates).forEach((key) => {
      if (key === 'hotspots' || key === 'screenshots') {
        capture[key] = listUtils.update(capture[key], updates[key])
      } else {
        capture[key] = updates[key]
      }
    })
  }

  return captures
}

function deleteCapture (state, captureId) {
  const captures = cloneDeep(state)
  return captures.filter(capture => capture.id !== captureId)
}
