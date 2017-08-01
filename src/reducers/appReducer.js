import cloneDeep from 'lodash/cloneDeep'
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

const initialState = {
  activeCaptureId: null,
  activeHotspotId: null,
  activeFloorPlanId: null,
  activeRoomId: null,
  loading: false,
  settings: {
    autoSave: true,
    invertControls: false
  }
}

export default function app (state = initialState, action) {
  switch (action.type) {
    case RESET_APP:
      return cloneDeep(initialState)
    case LOADING:
      return {
        ...cloneDeep(state),
        loading: action.payload
      }
    case ACTIVE_FLOORPLAN:
      return {
        ...cloneDeep(state),
        activeFloorPlanId: action.payload
      }
    case ACTIVE_CAPTURE:
      return {
        ...cloneDeep(state),
        activeCaptureId: action.payload
      }
    case ACTIVE_HOTSPOT:
      return {
        ...cloneDeep(state),
        activeHotspotId: action.payload
      }
    case ACTIVE_ROOM:
      return {
        ...cloneDeep(state),
        activeRoomId: action.payload
      }
    case ACTIVE_ROTATION:
      return {
        ...cloneDeep(state),
        cameraRotation: action.payload
      }
    case SETTING_INVERT_CONTROLS:
      const invertControlState = cloneDeep(state)
      invertControlState.settings.invertControls = action.payload
      return invertControlState
    case SETTING_AUTO_SAVE:
      const autoSaveState = cloneDeep(state)
      autoSaveState.settings.autoSave = action.payload
      return autoSaveState
    default:
      return state
  }
}
