import AWS from 'aws-sdk'
import fs from 'fs'
import Queue from './Queue'

import {
  getPropertyFileList,
  getPropertyFilePaths,
  getProperty
} from './localDbUtils'

const s3ApiVersion = '2006-03-01'
const bucketName = 'cc-karma-dev'
const s3Client = new AWS.S3({
  apiVersion: s3ApiVersion,
  Bucket: bucketName
})

export function downloadImages (id) {
  return new Promise((resolve, reject) => {
    resolve({message: 'TODO'})
  })
}

export function uploadImages (propertyId) {
  return new Promise((resolve, reject) => {
    getProperty(propertyId)
    .then((property) => {
      const fileList = getPropertyFileList(property)
      const filePaths = getPropertyFilePaths(fileList)
      const fileQueue = filePaths.map((file, i) => [file, fileList[i]])

      const imageUploads = new Queue(fileQueue, 4)
      imageUploads.listen((data) => {
        console.log('Update', data)
      })
      imageUploads.processQueue(uploadFile).then(
        (data) => { resolve(data) },
        (err) => { reject(err) }
      )
    })
  })
}

function uploadFile ([from, to]) {
  return new Promise((resolve, reject) => {
    fs.readFile(from, 'utf8', (err, data) => {
      if (err) { reject(err) }

      const params = {
        Bucket: bucketName,
        Key: to,
        Body: data
      }

      console.log(`Upload Start: ${to}`)
      s3Client.putObject(params, (err, data) => {
        if (err) {
          console.log(`Upload Error: ${to}`)
          console.log(err)
          reject(err)
        } else {
          console.log(`Upload Complete: ${to}`)
          resolve({ data, key: to })
        }
      })
    })
  })
}
