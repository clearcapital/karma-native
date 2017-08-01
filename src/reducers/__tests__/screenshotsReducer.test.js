import screenshots from '../screenshotsReducer'
import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_SCREENSHOT,
  DELETE_SCREENSHOT,
  UPDATE_SCREENSHOT
} from '../../constants/actionTypes'

const initialState = []

describe('screenshotsReducer', () => {
  describe('addScreenshot', () => {
    it('should add screenshot', () => {
      const testScreenshot = cloneDeep(initialState)
      testScreenshot.push('HELLOWORLD')

      expect(
        screenshots(initialState, {
          type: ADD_SCREENSHOT,
          payload: 'HELLOWORLD'
        })
      ).toEqual(testScreenshot)
    })
  })

  describe('deleteScreenshot', () => {
    let screenshotId = 420
    it('should delete screenshot', () => {
      const testScreenshots = cloneDeep(initialState)
      testScreenshots.filter(screenshot => screenshot.id !== screenshotId)

      expect(
        screenshots(initialState, {
          type: DELETE_SCREENSHOT,
          payload: screenshotId
        })
      ).toEqual(testScreenshots)
    })
  })

  describe('updateScreenshot', () => {
    let screenshotId = 420
    let updates = {
      any: 'any'
    }
    it('should update screenshot', () => {
      const testScreenshots = cloneDeep(initialState)
      const testscreenshot = testScreenshots.find(testscreenshot => testscreenshot.id === screenshotId)
      if (testscreenshot && updates) {
        Object.keys(updates).forEach((key) => {
          testscreenshot[key] = updates[key]
        })
      }

      expect(
        screenshots(initialState, {
          type: UPDATE_SCREENSHOT,
          payload: {
            screenshotId,
            updates
          }
        })
      ).toEqual(testScreenshots)
    })
  })
})
