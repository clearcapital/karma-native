import {
  ADD_CAPTURE,
  DELETE_CAPTURE,
  UPDATE_CAPTURE,
  UPDATE_ROOM
} from '../../constants/actionTypes'
import Capture from '../../models/Capture'
import * as actions from '../captureActions'
import * as testUtils from '../../../tests/testUtils'

describe('captureActions', () => {
  let mStore
  beforeEach(() => {
    mStore = testUtils.mockStore({})
  })

  describe('addCapture', () => {
    const testProps = {
      name: 'New Test Capture',
      id: 'capture-100'
    }
    const testRoomId = '10'
    const expectedCapture = new Capture(testProps)

    it('should add capture without RoomId', () => {
      mStore.dispatch(actions.addCapture(testProps, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(ADD_CAPTURE)
      expect(mActions[0].payload.id).toBe(expectedCapture.id)
      expect(mActions[0].payload.name).toBe(expectedCapture.name)
    })

    it('should add capture and set room id', () => {
      mStore.dispatch(actions.addCapture(testProps, testRoomId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(ADD_CAPTURE)
            expect(mAction.payload.id).toBe(expectedCapture.id)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_ROOM)
            expect(mAction.payload.roomId).toBe(testRoomId)
            expect(mAction.payload.updates.captures[0][0]).toBe('add')
            expect(mAction.payload.updates.captures[0][1]).toBe(expectedCapture.id)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })

  describe('updateCapture', () => {
    it('should update capture', () => {
      const testId = 'Test CaptureId'
      const testUpdates = {
        hotspots: [['add', '101'], ['delete', '100']],
        name: 'Test Capture Name'
      }
      const expectedAction = {
        type: UPDATE_CAPTURE,
        payload: { captureId: testId, updates: testUpdates }
      }

      expect(actions.updateCapture(testId, testUpdates)).toEqual(expectedAction)
    })
  })

  describe('deleteCapture', () => {
    const testCaptureId = 'capture-100'
    const testRoomId = '10'

    it('should delete capture without roomId', () => {
      mStore.dispatch(actions.deleteCapture(testCaptureId, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(DELETE_CAPTURE)
      expect(mActions[0].payload).toBe(testCaptureId)
    })

    it('should delete capture with roomId', () => {
      mStore.dispatch(actions.deleteCapture(testCaptureId, testRoomId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(DELETE_CAPTURE)
            expect(mAction.payload).toBe(testCaptureId)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_ROOM)
            expect(mAction.payload.roomId).toBe(testRoomId)
            expect(mAction.payload.updates.captures[0][0]).toBe('delete')
            expect(mAction.payload.updates.captures[0][1]).toBe(testCaptureId)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })
})
