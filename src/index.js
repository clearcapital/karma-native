import React from 'react'
import Main from './components/Main'
import {configureStore} from './store'
import {Provider} from 'react-redux'
import sampleData from './sampleData'
import Floorplan from './models/Floorplan'
import Capture from './models/Capture'
import Room from './models/Room'
import Hotspot from './models/Hotspot'
import Screenshot from './models/Screenshot'

const initialState = {
  app: {
    activeFloorPlanId: null,
    activeRoomId: null,
    activeCaptureId: null,
    activeHotspotId: null,
    settings: {
      invertControls: true,
      autoSave: true
    }
  },
  floorplans: sampleData.floorplans.map(floorplan => new Floorplan(floorplan)),
  rooms: sampleData.rooms.map(room => new Room(room)),
  captures: sampleData.captures.map(capture => new Capture(capture)),
  hotspots: sampleData.hotspots.map(hotspot => new Hotspot(hotspot)),
  screenshots: sampleData.screenshots.map(screenshot => new Screenshot(screenshot))
}

const store = configureStore(initialState)
const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

export default App
