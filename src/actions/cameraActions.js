import camera from '../services/camera'
// import {setSpinner} from './appActions'
// import {addNotification, updateNotification} from './notificationActions'
import {
  CAMERA_INFO,
  SESSION
} from '../constants/actionTypes'

export function getCameraInfo () {
  return dispatch => {
    return camera.getInfo().then(
      (data) => {
        dispatch({
          type: CAMERA_INFO,
          payload: data.cameraInfo
        })
        dispatch({
          type: SESSION,
          payload: data.sessionId
        })
      },
      () => {}
    )
  }
}

export function takePicture () {
  return (dispatch, getState) => {
    const state = getState()
    // dispatch(setSpinner(true))

    return camera.takePicture(state.camera.sessionId).then(
      (data) => {
        console.log('ACTION: take picture', data)
      },
      (err) => {
        console.error('ACTION:  take picture', err)
      }
    )
  }
}
