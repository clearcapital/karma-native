import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_SCREENSHOT,
  DELETE_SCREENSHOT,
  UPDATE_SCREENSHOT
} from '../constants/actionTypes'

// Array of Screenshot()
const initialState = []

export default function screenshots (state = initialState, action) {
  switch (action.type) {
    case ADD_SCREENSHOT:
      return addScreenshot(state, action.payload)
    case UPDATE_SCREENSHOT:
      const {screenshotId, updates} = action.payload
      return updateScreenshot(state, screenshotId, updates)
    case DELETE_SCREENSHOT:
      return deleteScreenshot(state, action.payload)
    default:
      return state
  }
}

function addScreenshot (state, screenshot) {
  const screenshots = cloneDeep(state)
  screenshots.push(screenshot)
  return screenshots
}

function updateScreenshot (state, screenshotId, updates) {
  const screenshots = cloneDeep(state)
  const screenshot = screenshots.find(screenshot => screenshot.id === screenshotId)

  if (screenshot && updates) {
    Object.keys(updates).forEach((key) => {
      screenshot[key] = updates[key]
    })
  }

  return screenshots
}

function deleteScreenshot (state, screenshotId) {
  const screenshots = cloneDeep(state)
  return screenshots.filter(screenshot => screenshot.id !== screenshotId)
}
