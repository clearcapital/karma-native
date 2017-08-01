import hotspots from '../hotspotsReducer'
import cloneDeep from 'lodash/cloneDeep'
import {
  ADD_HOTSPOT,
  DELETE_HOTSPOT,
  UPDATE_HOTSPOT
} from '../../constants/actionTypes'

const initialState = []

describe('hotspotsReducer', () => {
  describe('addScreenshot', () => {
    it('should add hotspot', () => {
      const testScreenshot = cloneDeep(initialState)
      testScreenshot.push('HELLOWORLD')

      expect(
        hotspots(initialState, {
          type: ADD_HOTSPOT,
          payload: 'HELLOWORLD'
        })
      ).toEqual(testScreenshot)
    })
  })

  describe('deleteScreenshot', () => {
    let hotspotId = 420
    it('should delete hotspot', () => {
      const testScreenshots = cloneDeep(initialState)
      testScreenshots.filter(hotspot => hotspot.id !== hotspotId)

      expect(
        hotspots(initialState, {
          type: DELETE_HOTSPOT,
          payload: hotspotId
        })
      ).toEqual(testScreenshots)
    })
  })

  describe('updateHotspot', () => {
    let hotspotId = 420
    let updates = {
      any: 'any'
    }
    it('should update hotspot', () => {
      const testScreenshots = cloneDeep(initialState)
      const testhotspot = testScreenshots.find(testhotspot => testhotspot.id === hotspotId)
      if (testhotspot && updates) {
        Object.keys(updates).forEach((key) => {
          testhotspot[key] = updates[key]
        })
      }

      expect(
        hotspots(initialState, {
          type: UPDATE_HOTSPOT,
          payload: {
            hotspotId,
            updates
          }
        })
      ).toEqual(testScreenshots)
    })
  })
})
