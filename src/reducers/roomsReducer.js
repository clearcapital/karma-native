import cloneDeep from 'lodash/cloneDeep'
import {
  DELETE_ROOM,
  ADD_ROOM,
  UPDATE_ROOM
} from '../constants/actionTypes'
import listUtils from '../services/listUtils'

// Array of Room ()
const initialState = []

export default function room (state = initialState, action) {
  switch (action.type) {
    case ADD_ROOM:
      return addRoom(state, action.payload)
    case DELETE_ROOM:
      return deleteRoom(state, action.payload)
    case UPDATE_ROOM:
      const {roomId, updates} = action.payload
      return updateRoom(state, roomId, updates)
    default:
      return state
  }
}

function addRoom (state, room) {
  const rooms = cloneDeep(state)
  rooms.push(room)
  return rooms
}

function updateRoom (state, roomId, updates) {
  const rooms = cloneDeep(state)
  const room = rooms.find(room => room.id === roomId)

  if (room && updates) {
    Object.keys(updates).forEach((key) => {
      if (key === 'captures') {
        room[key] = listUtils.update(room[key], updates[key])
      } else {
        room[key] = updates[key]
      }
    })
  }

  return rooms
}

function deleteRoom (state, roomId) {
  const rooms = cloneDeep(state)
  return rooms.filter(room => room.id !== roomId)
}
