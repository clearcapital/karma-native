import captures from '../capturesReducer'
import cloneDeep from 'lodash/cloneDeep'
import listUtils from '../../services/listUtils'
import {
  ADD_CAPTURE,
  DELETE_CAPTURE,
  UPDATE_CAPTURE
} from '../../constants/actionTypes'

const initialState = []

describe('capturesReducer', () => {
  describe('addCapture', () => {
    it('should add capture', () => {
      const testCapture = cloneDeep(initialState)
      testCapture.push('HELLOWORLD')

      expect(
        captures(initialState, {
          type: ADD_CAPTURE,
          payload: 'HELLOWORLD'
        })
      ).toEqual(testCapture)
    })
  })

  describe('deleteCapture', () => {
    let captureId = 420
    it('should delete capture', () => {
      const testCaptures = cloneDeep(initialState)
      testCaptures.filter(capture => capture.id !== captureId)

      expect(
        captures(initialState, {
          type: DELETE_CAPTURE,
          payload: captureId
        })
      ).toEqual(testCaptures)
    })
  })

  describe('updateCapture', () => {
    let captureId = 420
    let updates = {
      hotspots: 'hotspots',
      screenshots: 'screenshots',
      other: 'other'
    }
    it('should update capture', () => {
      const testCaptures = cloneDeep(initialState)
      const capture = testCaptures.find(capture => capture.id === captureId)
      if (capture && updates) {
        Object.keys(updates).forEach((key) => {
          if (key === 'hotspots' || key === 'screenshots') {
            capture[key] = listUtils.update(capture[key], updates[key])
          } else {
            capture[key] = updates[key]
          }
        })
      }

      expect(
        captures(initialState, {
          type: UPDATE_CAPTURE,
          payload: {
            captureId,
            updates
          }
        })
      ).toEqual(testCaptures)
    })
  })
})
