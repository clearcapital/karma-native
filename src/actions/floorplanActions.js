import {setActiveFloorPlan} from './appActions'
import Floorplan from '../models/Floorplan'
import {
  ADD_FLOORPLAN,
  DELETE_FLOORPLAN,
  UPDATE_FLOORPLAN
} from '../constants/actionTypes'

export function addFloorPlan () {
  const floorplan = new Floorplan()

  return [
    {
      type: ADD_FLOORPLAN,
      payload: floorplan
    },
    setActiveFloorPlan(floorplan.id)
  ]
}

export function deleteFloorPlan (floorplanId) {
  console.log('DELETE', floorplanId)
  return [
    {
      type: DELETE_FLOORPLAN,
      payload: floorplanId
    },
    setActiveFloorPlan(null)
  ]
}

export function updateFloorPlan (floorplanId, updates) {
  /*
    updates = {
      rooms: [['add', 'room-id'], ['delete', 'room-id']],
      name: 'name'
    }
  }
  */
  return {
    type: UPDATE_FLOORPLAN,
    payload: {floorplanId, updates}
  }
}
