import app from '../appReducer'
import cloneDeep from 'lodash/cloneDeep'
import {
  ACTIVE_CAPTURE,
  ACTIVE_FLOORPLAN,
  ACTIVE_HOTSPOT,
  ACTIVE_ROOM,
  ACTIVE_ROTATION,
  LOADING,
  RESET_APP,
  SETTING_AUTO_SAVE,
  SETTING_INVERT_CONTROLS
} from '../../constants/actionTypes'

describe('appReducer', () => {
  const initialState = app(undefined, '') // use this universally

  describe('reset app', () => {
    it('should reset app to initial state', () => {
      const testState = {
        ...cloneDeep(initialState),
        activeFloorPlanId: 'CABBAGE'
      }

      expect(
        app(testState, {
          type: RESET_APP
        })
      ).toEqual(initialState)
    })
  })

  describe('loading', () => {
    it('should set loading to true', () => {
      const testState = {
        ...cloneDeep(initialState),
        loading: true
      }

      expect(
        app(initialState, {
          type: LOADING,
          payload: true
        })
      ).toEqual(testState)
    })
  })

  describe('reduce active floor plan', () => {
    it('should reduce active floor plan', () => {
      const testState = {
        ...cloneDeep(initialState),
        activeFloorPlanId: 'CABBAGE'
      }

      expect(
        app(initialState, {
          type: ACTIVE_FLOORPLAN,
          payload: 'CABBAGE'
        })
      ).toEqual(testState)
    })
  })

  describe('reduce active capture', () => {
    it('should reduce active capture', () => {
      const testState = {
        ...cloneDeep(initialState),
        activeCaptureId: 'CABBAGE'
      }

      expect(
        app(initialState, {
          type: ACTIVE_CAPTURE,
          payload: 'CABBAGE'
        })
      ).toEqual(testState)
    })
  })

  describe('reduce active hotspot id', () => {
    it('should reduce active hotspot id', () => {
      const testState = {
        ...cloneDeep(initialState),
        activeHotspotId: 'CABBAGE'
      }

      expect(
        app(initialState, {
          type: ACTIVE_HOTSPOT,
          payload: 'CABBAGE'
        })
      ).toEqual(testState)
    })
  })

  describe('reduce active room id', () => {
    it('should reduce active room id', () => {
      const testState = {
        ...cloneDeep(initialState),
        activeRoomId: 'CABBAGE'
      }

      expect(
        app(initialState, {
          type: ACTIVE_ROOM,
          payload: 'CABBAGE'
        })
      ).toEqual(testState)
    })
  })

  describe('reduce active rotation', () => {
    it('should reduce active rotation', () => {
      const testState = {
        ...cloneDeep(initialState),
        cameraRotation: 360
      }

      expect(
        app(initialState, {
          type: ACTIVE_ROTATION,
          payload: 360
        })
      ).toEqual(testState)
    })
  })

  describe('reduce invert controls', () => {
    it('should reduce invert controls', () => {
      const testState = cloneDeep(initialState)
      testState['settings']['invertControls'] = true

      expect(
        app(initialState, {
          type: SETTING_INVERT_CONTROLS,
          payload: true
        })
      ).toEqual(testState)
    })
  })

  describe('reduce auto save', () => {
    it('should reduce auto save', () => {
      const testState = cloneDeep(initialState)
      testState['settings']['autoSave'] = true

      expect(
        app(initialState, {
          type: SETTING_AUTO_SAVE,
          payload: true
        })
      ).toEqual(testState)
    })
  })
})
