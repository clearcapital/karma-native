import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import raycast from './raycastReducer'
import hotspots from './hotspotsReducer'
import pano from './panoReducer'

export default combineReducers({
  raycast,
  hotspots,
  pano,
  routing
})
