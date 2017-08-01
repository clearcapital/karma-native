import {
  ADD_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM
} from '../constants/actionTypes'
import Room from '../models/Room'
import {updateFloorPlan} from './floorplanActions'

export function addRoom (props, floorplanId) {
  const room = new Room(props)
  return dispatch => {
    dispatch({
      type: ADD_ROOM,
      payload: room
    })

    if (floorplanId) {
      dispatch(updateFloorPlan(floorplanId, {
        rooms: [['add', room.id]]
      }))
    }
  }
}

export function deleteRoom (roomId, floorplanId) {
  return dispatch => {
    dispatch({
      type: DELETE_ROOM,
      payload: roomId
    })

    if (floorplanId) {
      dispatch(updateFloorPlan(floorplanId, {
        rooms: [['delete', roomId]]
      }))
    }
  }
}

export function updateRoom (roomId, updates) {
  return {
    type: UPDATE_ROOM,
    payload: {roomId, updates}
  }
}
