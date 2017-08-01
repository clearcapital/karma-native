import cloneDeep from 'lodash/cloneDeep'
import {
  CLOUD_PROPERTIES,
  DELETE_LOCAL_PROPERTY,
  LOCAL_PROPERTIES,
  ADD_LOCAL_PROPERTY,
  PROPERTY_XFER_COMPLETE,
  PROPERTY_XFER_START,
  ADD_CLOUD_PROPERTIES,
  DELETE_CLOUD_PROPERTY
} from '../constants/actionTypes'

// Arrays of string property ids
const initialState = {
  local: [],
  cloud: [],
  loading: []
}

export default function properties (state = initialState, action) {
  switch (action.type) {
    case LOCAL_PROPERTIES:
      return {
        ...cloneDeep(state),
        local: action.payload
      }
    case ADD_LOCAL_PROPERTY:
      return {
        ...cloneDeep(state),
        local: state.local.concat(action.payload)
      }
    case DELETE_LOCAL_PROPERTY:
      return {
        ...cloneDeep(state),
        local: state.local.filter(localPropId => localPropId !== action.payload)
      }
    case CLOUD_PROPERTIES:
      return {
        ...cloneDeep(state),
        cloud: action.payload
      }
    case ADD_CLOUD_PROPERTIES:
      return {
        ...cloneDeep(state),
        cloud: state.cloud.concat(action.payload)
      }
    case DELETE_CLOUD_PROPERTY:
      return {
        ...cloneDeep(state),
        cloud: state.cloud.filter(cloudPropId => cloudPropId !== action.payload)
      }
    case PROPERTY_XFER_START:
      return {
        ...cloneDeep(state),
        loading: state.loading.concat(action.payload)
      }
    case PROPERTY_XFER_COMPLETE:
      return {
        ...cloneDeep(state),
        loading: state.loading.filter(loadingPropId => loadingPropId !== action.payload)
      }
    default:
      return state
  }
}
