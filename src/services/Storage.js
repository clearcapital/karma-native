import {AsyncStorage} from 'react-native'

export default class Storage {
  static appKey = '@cc-karma'
  cache = {}

  constructor (instanceKey) {
    this.instanceKey = `${Storage.appKey}:${instanceKey}`
    this.getState = this.getState.bind(this, this.instanceKey)
    this.saveState = this.saveState.bind(this, this.instanceKey)
    this.cache = this.getState()
  }

  getState = async (instanceKey) => {
    let savedState = await AsyncStorage.getItem(instanceKey)
    return (savedState) ? JSON.parse(savedState) : {}
  }

  saveState = (instanceKey, state) => {
    return AsyncStorage.setItem(instanceKey, JSON.stringify(state))
  }

  async get (key) {
    return this.cache[key]
  }

  async set (key, value) {
    if (this.cache[key] === value) {
      return
    }

    this.cache[key] = value
    await this.saveState(this.cache)
    return true
  }

  async getAll () {
    const keys = await AsyncStorage.getAllKeys(this.instanceKey)
    return keys
  }

  async delete (key) {
    delete this.cache[key]
    await this.saveState(this.cache)
    return true
  }
}
