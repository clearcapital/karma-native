import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  DISMISS_NOTIFICATION,
  UPDATE_NOTIFICATION
} from '../constants/actionTypes'

export function addNotification ({type, title, message, error}) {
  const id = `${title.replace(/\s/g, '')}-${Date.now()}`

  return {
    type: ADD_NOTIFICATION,
    payload: {id, message, title, type, error}
  }
}

export function dismissNotification (notification) {
  return {
    type: DISMISS_NOTIFICATION,
    payload: notification
  }
}

export function clearNotifications () {
  return {
    type: CLEAR_NOTIFICATIONS,
    payload: null
  }
}

export function updateNotification (notification) {
  return {
    type: UPDATE_NOTIFICATION,
    payload: notification
  }
}
