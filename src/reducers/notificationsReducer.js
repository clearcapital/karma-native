import cloneDeep from 'lodash/cloneDeep'
import {
  CLEAR_NOTIFICATIONS,
  DISMISS_NOTIFICATION,
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION
} from '../constants/actionTypes'

const initialState = []

export default function notifications (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return addNotification(state, action.payload)
    case DISMISS_NOTIFICATION:
      return dismissNotification(state, action.payload)
    case CLEAR_NOTIFICATIONS:
      return []
    case UPDATE_NOTIFICATION:
      return updateNotification(state, action.payload)
    default:
      return state
  }
}

function addNotification (state, payload) {
  const notifications = cloneDeep(state)
  notifications.push({
    type: payload.type,
    title: payload.title,
    message: payload.message,
    id: payload.id
  })
  return notifications
}

function dismissNotification (state, payload) {
  const notifications = cloneDeep(state)
  return notifications.filter(notification => notification.id !== payload.id)
}

function updateNotification (state, payload) {
  const notifications = cloneDeep(state)
  const i = notifications.findIndex(notification => notification.id === payload.id)
  notifications[i] = payload
  return notifications
}
