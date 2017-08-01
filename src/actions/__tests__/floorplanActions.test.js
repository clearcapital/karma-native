import {
  ADD_FLOORPLAN,
  DELETE_FLOORPLAN,
  UPDATE_FLOORPLAN,
  ACTIVE_FLOORPLAN
} from '../../constants/actionTypes'
import Floorplan from '../../models/Floorplan'
import * as actions from '../floorplanActions'
import * as testUtils from '../../../tests/testUtils'

describe('floorplanActions', () => {
  let mStore
  beforeEach(() => {
    mStore = testUtils.mockStore({})
  })

  describe('addFloorPlan', () => {
    it('should add floorplan and mark it as active', () => {
      const expectedFloorPlan = new Floorplan()
      mStore.dispatch(actions.addFloorPlan())
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(ADD_FLOORPLAN)
            expect(mAction.payload.name).toBe(expectedFloorPlan.name)
            expect(mAction.payload.rooms).toEqual(expectedFloorPlan.rooms)
            break
          case 1:
            expect(mAction.type).toBe(ACTIVE_FLOORPLAN)
            expect(mAction.payload.substr(0, 20)).toBe(expectedFloorPlan.id.substr(0, 20))
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })

  describe('deleteFloorPlan', () => {
    it('should delete floorplan and nullify active floorplan', () => {
      const testId = 'floorplan-100'
      mStore.dispatch(actions.deleteFloorPlan(testId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(DELETE_FLOORPLAN)
            expect(mAction.payload).toBe(testId)
            break
          case 1:
            expect(mAction.type).toBe(ACTIVE_FLOORPLAN)
            expect(mAction.payload).toBe(null)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })

  describe('updateFloorPlan', () => {
    it('should return updates for a floorplan', () => {
      const testId = 'floorplan-100'
      const testUpdates = {
        rooms: [['add', '101'], ['delete', '100']],
        name: 'Test Floorplan Name'
      }
      const expectedAction = {
        type: UPDATE_FLOORPLAN,
        payload: { floorplanId: testId, updates: testUpdates }
      }

      expect(actions.updateFloorPlan(testId, testUpdates)).toEqual(expectedAction)
    })
  })
})
