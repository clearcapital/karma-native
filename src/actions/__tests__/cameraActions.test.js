import * as testUtils from '../../../tests/testUtils'
import * as actions from '../cameraActions'
import nock from 'nock'
import {
  CAMERA_INFO,
  SESSION
} from '../../constants/actionTypes'

describe('cameraActions', () => {
  describe('getCameraInfo', () => { // working test
    it('should dispatch cameraInfo and sessionId after getting info', () => {
      const mStore = testUtils.mockStore({})

      nock('http://192.168.1.1') // oscGetCameraInfo()
        .filteringPath(function (path) {
          return '/osc/info'
        })
        .get('/osc/info')
        .reply(200, {model: 'GoPro Hero 5'})
      nock('http://192.168.1.1') // oscStartSession()
        .filteringPath(function (path) {
          return 'osc/commands/execute'
        })
        .post('osc/commands/execute')
        .reply(200, { results: {sessionId: 100} })

      const passThrough = {timeout: 1000} // passed through by the get function
      const expectedActions = [
        {type: CAMERA_INFO, payload: {model: 'GoPro Hero 5'}},
        {type: SESSION, payload: 100}
      ]

      Object.assign(expectedActions[0].payload, passThrough)

      return mStore.dispatch(actions.getCameraInfo()).then(() => {
        expect(mStore.getActions()).toEqual(expectedActions)
      })
    })
  })

  // describe('takePicture', () => { // Hard to pin down exactly what should be tested
  //   it('should log the data from the picture', () => {
  //     const initialState = {
  //       camera: {
  //         sessionId: 100
  //       }
  //     }
  //     const mStore = testUtils.mockStore(initialState)
  //     nock('http://192.168.1.1') // oscStartSession
  //       .filteringPath(function (path) {
  //         return 'osc/commands/execute'
  //       })
  //       .post('osc/commands/execute', {
  //         name: 'camera.startSession',
  //         parameters: {}
  //       })
  //       .reply(200, { results: {sessionId: 100} })
  //       .post('osc/commands/execute', {
  //         name: 'camera.updateSession',
  //         parameters: {sessionId: 100}
  //       })
  //       .reply(200, { results: {sessionId: 100} })
  //       .post('osc/commands/execute', {
  //         name: 'camera.takePicture',
  //         parameters: {sessionId: 100}
  //       })
  //       .reply(200, { id: 100 })
  //       .post('osc/commands/execute', {
  //         name: 'camera.checkDoneStatus'
  //       })
  //       .reply(200, { id: 100 })
  //       .post('osc/commands/execute', { // oscGetStatus
  //         id: 100
  //       })
  //       .reply(200, { state: 'done', results: {fileUri: 'HELLOWORLD'} })
  //       .post('osc/commands/execute', {
  //         name: 'camera.listImages',
  //         parameters: {
  //           entryCount: 10,
  //           maxSize: 160
  //         }
  //       })
  //       .reply(200, {results: {entries: [{name: 'too much nesting', dateTimeZone: 'this took so long'}]}})
  //     return mStore.dispatch(actions.takePicture()).then(() => {
  //       expect(mStore.getActions()).toEqual([])
  //       // Not sure how to test this, but it must print out ACTION: take picture
  //       // followed by a bunch of data that can be seen above.
  //     })
  //   }, 9000)
  // })
})
