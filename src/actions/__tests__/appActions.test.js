import {
  setActiveFloorPlan,
  setActiveRoomId,
  setActiveCaptureId,
  setActiveHotspotId,
  setRotation,
  setActiveRoomCapture,
  gotoHotspot,
  setInvertControls,
  setAutoSave,
  // saveState,
  setSpinner,
  resetState
} from '../appActions'
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
import * as testUtils from '../../../tests/testUtils'

describe('appActions', () => {
  let mStore
  beforeEach(() => {
    mStore = testUtils.mockStore({})
  })

  describe('setActiveFloorPlan', () => {
    it('should set active floor plan', () => {
      const expectedId = 'room-123'
      const expectedAction = {
        type: ACTIVE_FLOORPLAN,
        payload: expectedId
      }

      expect(setActiveFloorPlan(expectedId)).toEqual(expectedAction)
    })
  })

  describe('setActiveRoomId', () => {
    it('should set active room id', () => {
      const expectedId = 'room-123'
      const expectedAction = {
        type: ACTIVE_ROOM,
        payload: expectedId
      }

      expect(setActiveRoomId(expectedId)).toEqual(expectedAction)
    })
  })

  describe('setActiveCaptureId', () => {
    it('should set active capture id', () => {
      const expectedId = 'room-123'
      const expectedAction = {
        type: ACTIVE_CAPTURE,
        payload: expectedId
      }

      expect(setActiveCaptureId(expectedId)).toEqual(expectedAction)
    })
  })

  describe('setActiveHotspotId', () => {
    it('should set active hotspot id', () => {
      const expectedId = 'room-123'
      const expectedAction = {
        type: ACTIVE_HOTSPOT,
        payload: expectedId
      }

      expect(setActiveHotspotId(expectedId)).toEqual(expectedAction)
    })
  })

  describe('setRotation', () => {
    it('should set rotation', () => {
      const expectedRotation = 360
      const expectedAction = {
        type: ACTIVE_ROTATION,
        payload: expectedRotation
      }

      expect(setRotation(expectedRotation)).toEqual(expectedAction)
    })
  })

  describe('setActiveRoomCapture', () => {
    it('should set active room capture from roomId and captureId', () => {
      const expectedRotation = null
      const expectedActiveRoomId = 'room-123'
      const expectedActiveCaptureId = 'capture-123'
      mStore.subscribe(() => {
        const storeActions = mStore.getActions()
        storeActions.forEach((storeAction, i) => {
          switch (i) {
            case 0:
              expect(storeAction.type).toBe(ACTIVE_ROTATION)
              expect(storeAction.payload).toBe(expectedRotation)
              break
            case 1:
              expect(storeAction.type).toBe(ACTIVE_ROOM)
              expect(storeAction.payload).toBe(expectedActiveRoomId)
              break
            case 2:
              expect(storeAction.type).toBe(ACTIVE_CAPTURE)
              expect(storeAction.payload).toBe(expectedActiveCaptureId)
              break
            default:
              expect(i).toNotBe(3)
          }
        })
        return mStore.dispatch(setActiveRoomCapture(expectedActiveRoomId, expectedActiveCaptureId))
      })
    })
  })
  describe('gotoHotspot', () => {
    it('should should go to a hot spot from roomId, captureId and hotspot.rotation', () => {
      const expectedActiveRoomId = 'room-123'
      const expectedActiveCaptureId = 'capture-123'
      const expectedHotspot = {'rotation': 360}
      mStore.subscribe(() => {
        const storeActions = mStore.getActions()
        storeActions.forEach((storeAction, i) => {
          switch (i) {
            case 0:
              expect(storeAction.type).toBe(ACTIVE_ROOM)
              expect(storeAction.payload).toBe(expectedActiveRoomId)
              break
            case 1:
              expect(storeAction.type).toBe(ACTIVE_CAPTURE)
              expect(storeAction.payload).toBe(expectedActiveCaptureId)
              break
            case 2:
              expect(storeAction.type).toBe(ACTIVE_ROTATION)
              expect(storeAction.payload).toBe(expectedHotspot.rotation)
              break
            default:
              expect(i).toNotBe(3)
          }
        })
        return mStore.dispatch(gotoHotspot(expectedActiveRoomId, expectedActiveCaptureId, expectedHotspot))
      })
    })
  })
  describe('setInvertControls', () => {
    it('should set controls inversion', () => {
      const expectedInversion = true
      const expectedAction = {
        type: SETTING_INVERT_CONTROLS,
        payload: expectedInversion
      }
      expect(setInvertControls(expectedInversion)).toEqual(expectedAction)
    })
  })
  describe('setAutoSave', () => {
    it('should set autosave (boolean)', () => {
      const expectedAutosave = true
      const expectedAction = {
        type: SETTING_AUTO_SAVE,
        payload: expectedAutosave
      }
      expect(setAutoSave(expectedAutosave)).toEqual(expectedAction)
    })
  })
  // describe('saveState', () => {
  //   it('should save state', () => {
  //     const startState = {}
  //     const expectedId = 'room-123'
  //     const expectedFloorPlans = "HIPPOPOTAMUS"
  //     const expectedRooms = 22
  //     const expectedAction = {
  //       payload: expectedAutosave
  //     }
  //     expect(setAutoSave(expectedAutosave)).toEqual(expectedAction)
  //   })
  // })
  describe('setSpinner', () => {
    it('should set spinner (boolean)', () => {
      const expectedSpinner = true
      const expectedAction = {
        type: LOADING,
        payload: expectedSpinner
      }
      expect(setSpinner(expectedSpinner)).toEqual(expectedAction)
    })
  })
  describe('resetState', () => {
    it('should reset state (no payload)', () => {
      const expectedAction = {
        type: RESET_APP
      }
      expect(resetState()).toEqual(expectedAction)
    })
  })
})
