import {
  ADD_SCREENSHOT,
  DELETE_SCREENSHOT,
  UPDATE_SCREENSHOT
} from '../constants/actionTypes'
import Screenshot from '../models/Screenshot'
import {updateCapture} from './captureActions'

export function addScreenshot (props, captureId) {
  const screenshot = new Screenshot(props)

  return dispatch => {
    dispatch({
      type: ADD_SCREENSHOT,
      payload: screenshot
    })

    if (captureId) {
      dispatch(updateCapture(captureId, {
        screenshot: [['add', screenshot.id]]
      }))
    }
  }
}

export function updateScreenshot (screenshotId, updates) {
  return {
    type: UPDATE_SCREENSHOT,
    payload: {screenshotId, updates}
  }
}

export function deleteScreenshot (screenshotId, captureId) {
  return dispatch => {
    dispatch({
      type: DELETE_SCREENSHOT,
      payload: screenshotId
    })

    if (captureId) {
      dispatch(updateCapture(captureId, {
        screenshot: [['delete', screenshotId]]
      }))
    }
  }
}
