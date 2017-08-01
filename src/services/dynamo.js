import AWS from 'aws-sdk'
import {getProperty} from './localDbUtils'
const apiVersion = '2012-08-10'
// const endpoint = 'http://localhost:8000'
const endpoint = 'https://dynamodb.us-west-2.amazonaws.com'
const region = 'us-west-2'
const tableName = 'cc-karma-dev'

AWS.config.update({apiVersion, endpoint, region})
const docClient = new AWS.DynamoDB.DocumentClient()

// scan is similiar to query but it rscans all documents before filtering
export function scanProperties () {
  return new Promise((resolve, reject) => {
    const params = {TableName: tableName}

    docClient.scan(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items)
      }
    })
  })
}

export function queryPropery () {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tableName,
      KeyConditionExpression: '#yr = :yyyy',
      ExpressionAttributeNames: {
        '#yr': 'year'
      },
      ExpressionAttributeValues: {
        ':yyyy': 1985
      }
    }

    docClient.query(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data.Items)
      }
    })
  })
}

export function readProperty (id) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tableName,
      Key: {id}
    }

    docClient.get(params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function createProperty (propertyId) {
  return getProperty(propertyId)
    .then((property) => {
      const {id, floorplans, rooms} = property
      const params = {
        TableName: tableName,
        Item: {id, floorplans, rooms}
      }

      docClient.put(params, (err, data) => {
        if (err) {
          throw (err)
        } else {
          return data
        }
      })
    })
}

export function updateProperty (id, update) {
  const params = {
    TableName: tableName,
    Key: {id},
    UpdateExpression: 'set info.rating = :r, info.plot=:p, info.actors=:a',
    ExpressionAttributeValues: { // would use the update params here
      ':r': 5.5,
      ':p': 'Everything happens all at once.',
      ':a': ['Larry', 'Moe', 'Curly']
    },
    ReturnValues: 'UPDATED_NEW'
  }

  docClient.update(params, (err, data) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log(JSON.stringify(data, null, 2))
    }
  })
}

export function deleteProperty (id) {
  const params = {
    TableName: tableName,
    Key: {id}
  }

  docClient.delete(params, (err, data) => {
    if (err) {
      console.log('err', err)
    } else {
      console.log(JSON.stringify(data, null, 2))
    }
  })
}

export function createTable () {
  const dynamodb = new AWS.DynamoDB()
  const params = {
    TableName: tableName,
    KeySchema: [
      {AttributeName: 'id', KeyType: 'HASH'}  // Partition key
      // {AttributeName: 'title', KeyType: 'RANGE'} // Sort Key
    ],
    AttributeDefinitions: [
      {AttributeName: 'id', AttributeType: 'S'}
      // {AttributeName: 'title', AttributeType: 'S'}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  }

  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
    }
  })
}

export function deleteTable () {
  const dynamodb = new AWS.DynamoDB()
  const params = {TableName: tableName}

  dynamodb.deleteTable(params, (err, data) => {
    if (err) {
      console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
      console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2))
    }
  })
}
