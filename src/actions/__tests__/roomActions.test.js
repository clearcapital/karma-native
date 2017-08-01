import {
  ADD_ROOM,
  DELETE_ROOM,
  UPDATE_ROOM,
  UPDATE_FLOORPLAN
} from '../../constants/actionTypes'
import Room from '../../models/Room'
import * as actions from '../roomActions'
import * as testUtils from '../../../tests/testUtils'

describe('roomActions', () => {
  let mStore
  beforeEach(() => {
    mStore = testUtils.mockStore({})
  })

  describe('addRoom', () => {
    const testProps = {
      name: 'New Test Room',
      id: 'room-100'
    }
    const testFloorplanId = '10'
    const expectedRoom = new Room(testProps)

    it('should add room WITHOUT floorplanId', () => {
      mStore.dispatch(actions.addRoom(testProps, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(ADD_ROOM)
      expect(mActions[0].payload.id).toBe(expectedRoom.id)
      expect(mActions[0].payload.name).toBe(expectedRoom.name)
    })

    it('should add room WITH floorplanId', () => {
      mStore.dispatch(actions.addRoom(testProps, testFloorplanId))
      const mActions = mStore.getActions()

      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(ADD_ROOM)
            expect(mAction.payload.id).toBe(expectedRoom.id)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_FLOORPLAN)
            expect(mAction.payload.floorplanId).toBe(testFloorplanId)
            expect(mAction.payload.updates.rooms[0][0]).toBe('add')
            expect(mAction.payload.updates.rooms[0][1]).toBe(expectedRoom.id)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })

  describe('updateRoom', () => {
    it('should update room', () => {
      const roomId = 'room-100'
      const testUpdates = {
        hotspots: [['add', '101'], ['delete', '100']],
        name: 'Test Room Name'
      }
      const expectedAction = {
        type: UPDATE_ROOM,
        payload: { roomId, updates: testUpdates }
      }

      expect(actions.updateRoom(roomId, testUpdates)).toEqual(expectedAction)
    })
  })

  describe('deleteRoom', () => {
    const roomId = 'room-100'
    const testFloorplanId = 'floorplan-100'
    it('should delete room WITHOUT floorplanId', () => {
      mStore.dispatch(actions.deleteRoom(roomId, null))
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(DELETE_ROOM)
      expect(mActions[0].payload).toBe(roomId)
    })

    it('should delete room WITH floorplanId', () => {
      mStore.dispatch(actions.deleteRoom(roomId, testFloorplanId))
      const mActions = mStore.getActions()
      mActions.forEach((mAction, i) => {
        switch (i) {
          case 0:
            expect(mAction.type).toBe(DELETE_ROOM)
            expect(mAction.payload).toBe(roomId)
            break
          case 1:
            expect(mAction.type).toBe(UPDATE_FLOORPLAN)
            expect(mAction.payload.floorplanId).toBe(testFloorplanId)
            expect(mAction.payload.updates.rooms[0][0]).toBe('delete')
            expect(mAction.payload.updates.rooms[0][1]).toBe(roomId)
            break
          default:
            expect(i).not.toBe(2)
        }
      })
    })
  })
})
