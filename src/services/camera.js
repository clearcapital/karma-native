import Api from './Api'
import {CameraRoll} from 'react-native'

const cameraUrl = 'http://192.168.1.1'
const api = new Api(cameraUrl)

const camera = {
  async getInfo () {
    const cameraInfo = await oscGetCameraInfo()
    const sessionData = await oscStartSession()

    return {
      cameraInfo,
      sessionId: sessionData.results.sessionId
    }
  },
  async takePicture (sessionId) {
    let sid = sessionId

    try {
      sid = await verifyCameraSession(sessionId)
      const status = await oscTakePicture(sid)
      const imageData = await processImage(status)
      // const assetUrl = await CameraRoll.saveToCameraRoll(`${cameraUrl}/${imageData.fileUri}`)
      const assetUrl = 'FIXME I am a test!'
      return {
        ...imageData,
        assetUrl,
        sessionId: sid
      }
    } catch (err) {
      return err
    }
  }
}

export default camera

async function verifyCameraSession (sessionId) {
  console.log('verifyCameraSession', sessionId)

  try {
    let sessionData = (!sessionId)
      ? await oscStartSession()
      : await oscUpdateSession(sessionId)

    return sessionData.results.sessionId
  } catch (err) {
    return err
  }
}

function processImage (status) {
  return new Promise((resolve, reject) => {
    // allows for the image to be processed by the camera, approx 6 seconds
    setTimeout(async () => {
      try {
        const imageStatus = await oscCheckDoneStatus(status)
        const {fileUri} = imageStatus.results
        const images = await oscGetImages()
        const {results: {entries}} = images

        resolve({
          fileUri,
          name: entries[0].name,
          date: entries[0].dateTimeZone
        })
      } catch (err) {
        reject(err)
      }
    }, 5000)
  })
}

// Handlers
function oscGetCameraInfo () {
  console.log('oscGetCameraInfo')
  // set a short timeout so we don't keep the user waiting
  // (the local wifi connection to the camera will respond quickly)
  return api.get('osc/info', {timeout: 1000})
}

function oscStartSession () {
  console.log('oscStartSession')

  const command = {
    name: 'camera.startSession',
    parameters: {}
  }

  return api.post('osc/commands/execute', command)
}

function oscUpdateSession (sessionId) {
  console.log('oscUpdateSession', sessionId)

  const command = {
    name: 'camera.updateSession',
    parameters: {sessionId}
  }

  return api.post('osc/commands/execute', command)
}

function oscGetImages () {
  console.log('oscGetImages')

  const command = {
    name: 'camera.listImages',
    parameters: {
      entryCount: 10,
      maxSize: 160
    }
  }

  return api.post('osc/commands/execute', command)
}

function oscTakePicture (sessionId) {
  console.log('oscTakePicture', sessionId)

  const command = {
    name: 'camera.takePicture',
    parameters: {sessionId}
  }

  return api.post('osc/commands/execute', command)
}

async function oscCheckDoneStatus (status) {
  console.log('oscCheckDoneStatus')

  const nextStatus = await oscGetStatus(status.id)

  if (nextStatus.state !== 'done') {
    return oscCheckDoneStatus(nextStatus)
  } else {
    return nextStatus
  }
}

function oscGetStatus (id) {
  console.log('oscGetStatus', id)

  const command = {id}
  return api.post('osc/commands/status', command)
}
