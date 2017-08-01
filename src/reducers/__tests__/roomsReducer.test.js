import rooms from '../roomsReducer'
import cloneDeep from 'lodash/cloneDeep'
import listUtils from '../../services/listUtils'
import {
  ADD_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM
} from '../../constants/actionTypes'

const initialState = []

describe('roomsReducer', () => {
  describe('addRoom', () => {
    it('should add room', () => {
      const testRoom = cloneDeep(initialState)
      testRoom.push('HELLOWORLD')

      expect(
        rooms(initialState, {
          type: ADD_ROOM,
          payload: 'HELLOWORLD'
        })
      ).toEqual(testRoom)
    })
  })

  describe('deleteRoom', () => {
    let roomId = 420
    it('should delete room', () => {
      const testRooms = cloneDeep(initialState)
      testRooms.filter(room => room.id !== roomId)

      expect(
        rooms(initialState, {
          type: DELETE_ROOM,
          payload: roomId
        })
      ).toEqual(testRooms)
    })
  })

  describe('updateRoom', () => {
    let roomId = 420
    let updates = {
      captures: 'captures',
      other: 'other'
    }
    it('should update room', () => {
      const testRooms = cloneDeep(initialState)
      const testroom = testRooms.find(testroom => testroom.id === roomId)
      if (testroom && updates) {
        Object.keys(updates).forEach((key) => {
          if (key === 'captures') {
            testroom[key] = listUtils.update(testroom[key], updates[key])
          } else {
            testroom[key] = updates[key]
          }
        })
      }

      expect(
        rooms(initialState, {
          type: UPDATE_ROOM,
          payload: {
            roomId,
            updates
          }
        })
      ).toEqual(testRooms)
    })
  })
})
