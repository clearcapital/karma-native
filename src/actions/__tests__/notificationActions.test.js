import {
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATIONS,
  DISMISS_NOTIFICATION,
  UPDATE_NOTIFICATION
} from '../../constants/actionTypes'
import * as actions from '../notificationActions'

describe('notificationActions', () => {
  it('should be true', () => {
    expect(true).toBe(true)
  })

  const type = 'Test'
  const title = 'Test Title'
  const message = 'Testing, 1 2 3'
  const error = 'FUBAR'
  const id = `${title.replace(/\s/g, '')}-${Date.now()}`
  const testParams = {type, title, message, error}
  const testNotification = Object.assign({}, testParams, {id})

  describe('addNotification', () => {
    it('should add a notification', () => {
      const expectedAction = {
        type: ADD_NOTIFICATION,
        payload: testNotification
      }
      const retAction = actions.addNotification(testParams)

      expect(retAction.type).toBe(expectedAction.type)
      expect(retAction.payload.type).toBe(expectedAction.payload.type)
      expect(retAction.payload.title).toBe(expectedAction.payload.title)
      expect(retAction.payload.message).toBe(expectedAction.payload.message)
      expect(retAction.payload.error).toBe(expectedAction.payload.error)
      expect(retAction.payload.id.substr(0, 20)).toBe(expectedAction.payload.id.substr(0, 20))
    })
  })

  describe('dismissNotification', () => {
    it('should dismiss a notification', () => {
      const expectedAction = {
        type: DISMISS_NOTIFICATION,
        payload: testNotification
      }

      expect(actions.dismissNotification(testNotification)).toEqual(expectedAction)
    })
  })

  describe('clearNotifications', () => {
    it('should clear notifications', () => {
      const expectedAction = {
        type: CLEAR_NOTIFICATIONS,
        payload: null
      }

      expect(actions.clearNotifications(testNotification)).toEqual(expectedAction)
    })
  })

  describe('updateNotification', () => {
    it('should update a notification', () => {
      const expectedAction = {
        type: UPDATE_NOTIFICATION,
        payload: testNotification
      }

      expect(actions.updateNotification(testNotification)).toEqual(expectedAction)
    })
  })
})
