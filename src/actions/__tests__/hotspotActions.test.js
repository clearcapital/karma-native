import {
  ADD_HOTSPOT,
  DELETE_HOTSPOT,
  UPDATE_HOTSPOT,
  UPDATE_CAPTURE
} from '../../constants/actionTypes'
import Hotspot from '../../models/Hotspot'
import * as actions from '../hotspotActions'
import * as testUtils from '../../../tests/testUtils'

describe('hotspotActions', () => {
  let mStore
  beforeEach(() => {
    mStore = testUtils.mockStore({})
  })

  describe('addHotspot', () => {
    const testProps = {
      name: 'New Test Hotspot',
      id: 'hotspot-100'
    }
    const testCaptureId = 'capture-100'
    const expectedHotspot = new Hotspot(testProps)

    it('should add hotspot WITHOUT captureId', () => {
      mStore.dispatch(actions.addHotspot(testProps, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(ADD_HOTSPOT)
      expect(mActions[0].payload.id).toBe(expectedHotspot.id)
      expect(mActions[0].payload.name).toBe(expectedHotspot.name)
    })

    it('should add hotspot WITH capture id', () => {
      mStore.dispatch(actions.addHotspot(testProps, testCaptureId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(ADD_HOTSPOT)
            expect(mAction.payload.id).toBe(expectedHotspot.id)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_CAPTURE)
            expect(mAction.payload.captureId).toBe(testCaptureId)
            expect(mAction.payload.updates.hotspot[0][0]).toBe('add')
            expect(mAction.payload.updates.hotspot[0][1]).toBe(expectedHotspot.id)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })

  describe('updateHotspot', () => {
    it('should update hotspot', () => {
      const testId = 'Test HotspotId'
      const testUpdates = {
        hotspot: [['add', '101'], ['delete', '100']],
        name: 'Test Hotspot Name'
      }
      const expectedAction = {
        type: UPDATE_HOTSPOT,
        payload: { hotspotId: testId, updates: testUpdates }
      }

      expect(actions.updateHotspot(testId, testUpdates)).toEqual(expectedAction)
    })
  })

  describe('deleteHotspot', () => {
    const testHotspotId = 'hotspot-100'
    const testCaptureId = 'capture-100'

    it('should delete hotspot WITHOUT captureId', () => {
      mStore.dispatch(actions.deleteHotspot(testHotspotId, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(DELETE_HOTSPOT)
      expect(mActions[0].payload).toBe(testHotspotId)
    })

    it('should delete hotspot WITH captureId', () => {
      mStore.dispatch(actions.deleteHotspot(testHotspotId, testCaptureId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(DELETE_HOTSPOT)
            expect(mAction.payload).toBe(testHotspotId)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_CAPTURE)
            expect(mAction.payload.captureId).toBe(testCaptureId)
            expect(mAction.payload.updates.hotspot[0][0]).toBe('delete')
            expect(mAction.payload.updates.hotspot[0][1]).toBe(testHotspotId)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })
})
