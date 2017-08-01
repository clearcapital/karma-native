import {
  ADD_SCREENSHOT,
  DELETE_SCREENSHOT,
  UPDATE_SCREENSHOT,
  UPDATE_CAPTURE
} from '../../constants/actionTypes'
import Screenshot from '../../models/Screenshot'
import * as actions from '../screenshotActions'
import * as testUtils from '../../../tests/testUtils'

describe('screenshotActions', () => {
  let mStore
  beforeEach(() => {
    mStore = testUtils.mockStore({})
  })

  describe('addScreenshot', () => {
    const testProps = {
      name: 'New Test Screenshot',
      id: 'screenshot-100'
    }
    const testCaptureId = 'capture-100'
    const expectedScreenshot = new Screenshot(testProps)

    it('should add screenshot without CaptureId', () => {
      mStore.dispatch(actions.addScreenshot(testProps, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(ADD_SCREENSHOT)
      expect(mActions[0].payload.id).toBe(expectedScreenshot.id)
      expect(mActions[0].payload.name).toBe(expectedScreenshot.name)
    })

    it('should add screenshot and set capture id', () => {
      mStore.dispatch(actions.addScreenshot(testProps, testCaptureId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(ADD_SCREENSHOT)
            expect(mAction.payload.id).toBe(expectedScreenshot.id)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_CAPTURE)
            expect(mAction.payload.captureId).toBe(testCaptureId)
            expect(mAction.payload.updates.screenshot[0][0]).toBe('add')
            expect(mAction.payload.updates.screenshot[0][1]).toBe(expectedScreenshot.id)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })

  describe('updateScreenshot', () => {
    it('should update screenshot', () => {
      const testId = 'Test ScreenshotId'
      const testUpdates = {
        screenshot: [['add', '101'], ['delete', '100']],
        name: 'Test Screenshot Name'
      }
      const expectedAction = {
        type: UPDATE_SCREENSHOT,
        payload: { screenshotId: testId, updates: testUpdates }
      }

      expect(actions.updateScreenshot(testId, testUpdates)).toEqual(expectedAction)
    })
  })

  describe('deleteScreenshot', () => {
    const testScreenshotId = 'screenshot-100'
    const testCaptureId = 'capture-100'

    it('should delete screenshot without captureId', () => {
      mStore.dispatch(actions.deleteScreenshot(testScreenshotId, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(DELETE_SCREENSHOT)
      expect(mActions[0].payload).toBe(testScreenshotId)
    })

    it('should delete screenshot with captureId', () => {
      mStore.dispatch(actions.deleteScreenshot(testScreenshotId, testCaptureId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(DELETE_SCREENSHOT)
            expect(mAction.payload).toBe(testScreenshotId)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_CAPTURE)
            expect(mAction.payload.captureId).toBe(testCaptureId)
            expect(mAction.payload.updates.screenshot[0][0]).toBe('delete')
            expect(mAction.payload.updates.screenshot[0][1]).toBe(testScreenshotId)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })
})
