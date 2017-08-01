import {
  ADD_LOCAL_PROPERTY,
  // CLOUD_PROPERTIES,
  DELETE_LOCAL_PROPERTY,
  // LOCAL_PROPERTIES,
  LOADING
} from '../../constants/actionTypes'
import * as actions from '../propertiesActions'
import * as testUtils from '../../../tests/testUtils'

describe('propertiesActions', () => {
  const testPropertyId = 'property-100'
  let mStore
  beforeEach(() => {
    mStore = testUtils.mockStore({})
  })

  describe('getLocalProperties', () => {
    it('should dispatch an action to show spinner', () => {
      mStore.dispatch(actions.getLocalProperties())
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(LOADING)
      expect(mActions[0].payload).toBe(true)
    })
  })

  describe('newLocalProperty', () => {
    it('should create a new local property', () => {
      const expectedAction = {
        type: ADD_LOCAL_PROPERTY,
        payload: testPropertyId
      }

      expect(actions.newLocalProperty(testPropertyId)).toEqual(expectedAction)
    })
  })

  describe('deleteLocalProperty', () => {
    it('should delete a local property', () => {
      const expectedAction = {
        type: DELETE_LOCAL_PROPERTY,
        payload: testPropertyId
      }

      expect(actions.deleteLocalProperty(testPropertyId)).toEqual(expectedAction)
    })
  })

  describe('getCloudProperties', () => {
    it('should dispatch an action to show spinner', () => {
      mStore.dispatch(actions.getCloudProperties())
      const mActions = mStore.getActions()

      expect(mActions.length).toBe(1)
      expect(mActions[0].type).toBe(LOADING)
      expect(mActions[0].payload).toBe(true)
    })
  })
})
