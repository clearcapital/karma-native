import {combineReducers} from 'redux'
import app from './appReducer'
import camera from './cameraReducer'
import captures from './capturesReducer'
import floorplans from './floorplansReducer'
import hotspots from './hotspotsReducer'
import notifications from './notificationsReducer'
import properties from './propertiesReducer'
import rooms from './roomsReducer'
import screenshots from './screenshotsReducer'

const id = (state = '', action) => (action.type === 'PROPERTY_ID') ? action.payload : state
const route = (state = { hash: '', timestamp: null }, action) => (action.type === 'ROUTE') ? action.payload : state

export default combineReducers({
  app,
  camera,
  captures,
  floorplans,
  hotspots,
  id,
  notifications,
  properties,
  rooms,
  route,
  screenshots
})
