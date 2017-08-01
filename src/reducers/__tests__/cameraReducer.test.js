import camera from '../cameraReducer'
import cloneDeep from 'lodash/cloneDeep'
import {
  CAMERA_INFO,
  SESSION
} from '../../constants/actionTypes'

const initialState = {
  cameraInfo: {},
  sessionId: null
}

describe('cameraReducer', () => {
  describe('camera info', () => {
    let payload = 'HELLOWORLD'
    it('should reduce camera info', () => {
      const testState = {
        ...cloneDeep(initialState),
        cameraInfo: payload
      }

      expect(
        camera(initialState, {
          type: CAMERA_INFO,
          payload: payload
        })
      ).toEqual(testState)
    })
  })

  describe('session', () => {
    let payload = 'HELLOWORLD'
    it('should reduce session id', () => {
      const testState = {
        ...cloneDeep(initialState),
        sessionId: payload
      }

      expect(
        camera(initialState, {
          type: SESSION,
          payload: payload
        })
      ).toEqual(testState)
    })
  })
})
