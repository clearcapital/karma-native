import notifications from '../notificationsReducer'
import cloneDeep from 'lodash/cloneDeep'
import {
  CLEAR_NOTIFICATIONS,
  DISMISS_NOTIFICATION,
  ADD_NOTIFICATION,
  UPDATE_NOTIFICATION
} from '../../constants/actionTypes'

const initialState = []

describe('notificationsReducer', () => {
  const examplePayload = {
    type: 'HipChat',
    title: 'test post please ignore',
    message: 'HELLOWORLD',
    id: 1
  }

  describe('Notification', () => {
    it('should add notification', () => {
      const testNotification = cloneDeep(initialState)
      testNotification.push(examplePayload)

      expect(
        notifications(initialState, {
          type: ADD_NOTIFICATION,
          payload: examplePayload
        })
      ).toEqual(testNotification)
    })
  })

  describe('dismissNotification', () => {
    let notificationId = 1

    it('should dismiss notification', () => {
      const testNotifications = cloneDeep(initialState)
      testNotifications.filter(notification => notification.id !== notificationId)

      expect(
        notifications(initialState, {
          type: DISMISS_NOTIFICATION,
          payload: notificationId
        })
      ).toEqual(testNotifications)
    })
  })

  describe('updateNotification', () => {
    it('should update notification', () => {
      const testNotifications = cloneDeep(initialState)
      const i = testNotifications.findIndex(notification => notification.id === examplePayload.Id)
      testNotifications[i] = examplePayload

      expect(
        notifications(initialState, {
          type: UPDATE_NOTIFICATION,
          payload: examplePayload
        })
      ).toEqual(testNotifications)
    })
  })

  describe('clearNotifications', () => {
    it('should clear notifications', () => {
      const testState = cloneDeep(initialState)
      testState.push(examplePayload)

      expect(
        notifications(testState, {
          type: CLEAR_NOTIFICATIONS,
          payload: examplePayload
        })
      ).toEqual(initialState)
    })
  })
})
