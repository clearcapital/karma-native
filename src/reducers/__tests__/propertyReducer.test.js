import properties from '../propertyReducer'
import cloneDeep from 'lodash/cloneDeep'

import {PROPERTY} from '../../constants/actionTypes'

const initialState = {}

describe('propertyReducer', () => {
  describe('property', () => {
    const examplePayload = {
      name: 'HELLOWORLD',
      location: 'Roseville'
    }

    it('should just clone the payload', () => {
      const testProperty = cloneDeep(examplePayload)

      expect(properties(initialState, {
        type: PROPERTY,
        payload: examplePayload
      })).toEqual(testProperty)
    })
  })
})
