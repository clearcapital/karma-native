import {api} from '../services/api'
import {setFloorPlans, newFloorPlan} from './floorplanActions'
import {setRooms} from './roomActions'
import {saveState, changeRoute, setActiveFloorPlan} from './appActions'
import {deleteLocalProperty, newLocalProperty} from './propertiesActions'
import {
  ADD_CLOUD_PROPERTIES,
  DELETE_LOCAL_PROPERTY,
  PROPERTY_XFER_COMPLETE,
  PROPERTY_XFER_START,
  ADD_LOCAL_PROPERTY
} from '../constants/actionTypes'

export function newProperty () {
  return (dispatch) => {
    api.post('properties', {}).then(
      (data) => {
        const {floorplans, rooms, id} = data

        // Adds a property to the available properties list
        dispatch(newLocalProperty(id))

        // updates the property id for the new property
        dispatch({type: 'PROPERTY_ID', payload: id})
        dispatch([
          setFloorPlans(floorplans),
          setRooms(rooms),
          newFloorPlan(),
          saveState()
        ])
        dispatch(changeRoute('/overview'))
      },
      (err) => { console.error(err) }
    )
  }
}

export function loadProperty (propertyId) {
  return (dispatch) => {
    api.get(`properties/${propertyId}`).then(
      (data) => {
        const {floorplans, rooms, id} = data

        dispatch({type: 'PROPERTY_ID', payload: id})
        dispatch(setFloorPlans(floorplans))
        dispatch(setRooms(rooms))

        if (floorplans.length) {
          dispatch(setActiveFloorPlan(floorplans[0].id))
        } else {
          dispatch([
            newFloorPlan(),
            saveState()
          ])
        }

        dispatch(changeRoute('/overview'))
      },
      (err) => { console.error(err) }
    )
  }
}

export function downloadProperty (propertyId) {
  return (dispatch) => {
    dispatch({
      type: PROPERTY_XFER_START,
      payload: propertyId
    })

    api.get(`cloud/${propertyId}`, {}, 300000).then(
      (data) => {
        // dispatch({
        //   type: REMOVE_CLOUD_PROPERTY,
        //   payload: propertyId
        // })
        dispatch({
          type: ADD_LOCAL_PROPERTY,
          payload: propertyId
        })
        dispatch({
          type: PROPERTY_XFER_COMPLETE,
          payload: propertyId
        })
      },
      (err) => {
        console.error(err)
        dispatch({
          type: PROPERTY_XFER_COMPLETE,
          payload: propertyId
        })
      }
    )
  }
}

export function uploadProperty (propertyId) {
  return (dispatch) => {
    dispatch({
      type: PROPERTY_XFER_START,
      payload: propertyId
    })

    api.post(`cloud/${propertyId}`, {}, 300000).then(
      (data) => {
        dispatch({
          type: PROPERTY_XFER_COMPLETE,
          payload: propertyId
        })
        dispatch({
          type: DELETE_LOCAL_PROPERTY,
          payload: propertyId
        })
        dispatch({
          type: ADD_CLOUD_PROPERTIES,
          payload: propertyId
        })
      },
      (err) => {
        console.error(err)
        dispatch({
          type: PROPERTY_XFER_COMPLETE,
          payload: propertyId
        })
      }
    )
  }
}

export function deleteProperty (propertyId) {
  return (dispatch) => {
    api.delete(`properties/${propertyId}`).then(
      (data) => { dispatch(deleteLocalProperty(propertyId)) },
      (err) => { console.log(err) }
    )
  }
}
