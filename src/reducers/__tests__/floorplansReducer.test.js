import floorplan from '../floorplansReducer'
import cloneDeep from 'lodash/cloneDeep'
import listUtils from '../../services/listUtils'
import {
  ADD_FLOORPLAN,
  DELETE_FLOORPLAN,
  UPDATE_FLOORPLAN
} from '../../constants/actionTypes'

const initialState = []

describe('floorplansReducer', () => {
  describe('addFloorPlan', () => {
    it('should add floorplan', () => {
      const testFloorPlan = cloneDeep(initialState)
      testFloorPlan.push('HELLOWORLD')

      expect(
        floorplan(initialState, {
          type: ADD_FLOORPLAN,
          payload: 'HELLOWORLD'
        })
      ).toEqual(testFloorPlan)
    })
  })

  describe('deleteFloorPlan', () => {
    let floorplanId = 420
    it('should delete floorplan', () => {
      const testFloorPlans = cloneDeep(initialState)
      testFloorPlans.filter(floorplan => floorplan.id !== floorplanId)

      expect(
        floorplan(initialState, {
          type: DELETE_FLOORPLAN,
          payload: floorplanId
        })
      ).toEqual(testFloorPlans)
    })
  })

  describe('updateFloorplan', () => {
    let floorplanId = 420
    let updates = {
      rooms: 'rooms',
      other: 'other'
    }
    it('should update floorplan', () => {
      const testFloorPlans = cloneDeep(initialState)
      const testfloorplan = testFloorPlans.find(testfloorplan => testfloorplan.id === floorplanId)
      if (testfloorplan && updates) {
        Object.keys(updates).forEach((key) => {
          if (key === 'rooms') {
            testfloorplan[key] = listUtils.update(testfloorplan[key], updates[key])
          } else {
            testfloorplan[key] = updates[key]
          }
        })
      }

      expect(
        floorplan(initialState, {
          type: UPDATE_FLOORPLAN,
          payload: {
            floorplanId,
            updates
          }
        })
      ).toEqual(testFloorPlans)
    })
  })
})
