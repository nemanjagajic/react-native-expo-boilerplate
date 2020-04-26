import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'

import config from '../config'

class HttpService {
  constructor(options = {}) {
    this.client = axios.create(options)
    this.client.interceptors.response.use(this.handleSuccessResponse, this.handleErrorResponse)
  }

  attachHeaders(headers) {
    Object.assign(this.client.defaults.headers, headers)
  }

  removeHeaders(headerKeys) {
    headerKeys.forEach(key => delete this.client.defaults.headers[key])
  }

  handleSuccessResponse(response) {
    return response
  }

  handleErrorResponse = error => {
    try {
      const { status, data } = error.response
      console.log({error: error.response})
      if (status === 401) AsyncStorage.clear()
      Alert.alert(`Error ${status}`, data.message)
      return Promise.reject(error)
    } catch (e) {
      return Promise.reject(error)
    }
  }
}

const options = {
  baseURL: config.API_BASE_URL
}
const httpService = new HttpService(options)

export default httpService
