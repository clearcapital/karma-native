import properties from '../propertiesReducer'
import cloneDeep from 'lodash/cloneDeep'
import {
  CLOUD_PROPERTIES,
  DELETE_LOCAL_PROPERTY,
  LOCAL_PROPERTIES,
  ADD_LOCAL_PROPERTY,
  PROPERTY_XFER_COMPLETE,
  PROPERTY_XFER_START,
  ADD_CLOUD_PROPERTIES,
  DELETE_CLOUD_PROPERTY
} from '../../constants/actionTypes'

const initialState = {
  local: [],
  cloud: [],
  loading: []
}

describe('propertiesReducer', () => {
  describe('local properties', () => {
    it('should reduce local properties', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        local: [1, 2, 3]
      }

      expect(
        properties(initialState, {
          type: LOCAL_PROPERTIES,
          payload: [1, 2, 3]
        })
      ).toEqual(testProperties)
    })
  })

  describe('new local property', () => {
    let exampleProperty = [9, 10]
    it('should add new local property', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        local: initialState.local.concat(exampleProperty)
      }

      expect(
        properties(initialState, {
          type: ADD_LOCAL_PROPERTY,
          payload: exampleProperty
        })
      ).toEqual(testProperties)
    })
  })

  describe('delete local property', () => {
    let exampleProperty = 1

    it('should delete local property', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        local: initialState.local.filter(localPropId => localPropId !== exampleProperty)
      }

      expect(
        properties(initialState, {
          type: DELETE_LOCAL_PROPERTY,
          payload: exampleProperty
        })
      ).toEqual(testProperties)
    })
  })

  describe('cloud properties', () => {
    it('should reduce cloud properties', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        cloud: [1, 2, 3]
      }

      expect(
        properties(initialState, {
          type: CLOUD_PROPERTIES,
          payload: [1, 2, 3]
        })
      ).toEqual(testProperties)
    })
  })

  describe('add cloud property', () => {
    let exampleProperty = [9, 10]
    it('should add new cloud property', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        cloud: initialState.cloud.concat(exampleProperty)
      }

      expect(
        properties(initialState, {
          type: ADD_CLOUD_PROPERTIES,
          payload: exampleProperty
        })
      ).toEqual(testProperties)
    })
  })

  describe('delete cloud property', () => {
    let exampleProperty = 4

    it('should delete cloud property', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        cloud: initialState.cloud.filter(cloudPropId => cloudPropId !== exampleProperty)
      }

      expect(
        properties(initialState, {
          type: DELETE_CLOUD_PROPERTY,
          payload: exampleProperty
        })
      ).toEqual(testProperties)
    })
  })

  describe('property transfer start', () => {
    let exampleProperty = 1

    it('should add property to loading', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        loading: initialState.loading.concat(exampleProperty)
      }

      expect(
        properties(initialState, {
          type: PROPERTY_XFER_START,
          payload: exampleProperty
        })
      ).toEqual(testProperties)
    })
  })

  describe('property transfer complete', () => {
    let exampleProperty = 1

    it('should remove property from loading', () => {
      const testProperties = {
        ...cloneDeep(initialState),
        loading: initialState.loading.filter(loadingPropId => loadingPropId !== exampleProperty)
      }

      expect(
        properties(initialState, {
          type: PROPERTY_XFER_COMPLETE,
          payload: exampleProperty
        })
      ).toEqual(testProperties)
    })
  })
})
