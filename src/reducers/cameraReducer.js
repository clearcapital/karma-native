import cloneDeep from 'lodash/cloneDeep'
import {
  CAMERA_INFO,
  SESSION
} from '../constants/actionTypes'

const initialState = {
  cameraInfo: {},
  sessionId: null
}

export default function camera (state = initialState, action) {
  switch (action.type) {
    case CAMERA_INFO:
      return {
        ...cloneDeep(state),
        cameraInfo: action.payload
      }
    case SESSION:
      return {
        ...cloneDeep(state),
        sessionId: action.payload
      }
    default:
      return state
  }
}
