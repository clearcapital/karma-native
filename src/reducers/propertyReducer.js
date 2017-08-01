import cloneDeep from 'lodash/cloneDeep'
import {PROPERTY} from '../constants/actionTypes'

const initialState = {}

export default function properties (state = initialState, action) {
  switch (action.type) {
    case PROPERTY:
      return cloneDeep(action.payload)
    default:
      return state
  }
}
