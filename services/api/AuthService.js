import ApiService from '../ApiService'
import { AsyncStorage } from 'react-native'


const API_ENDPOINTS = {
  LOGIN: '/auth/login',
}

class AuthService extends ApiService {
  createSession = async user => {
    await AsyncStorage.setItem('user', JSON.stringify(user))
    await this.setAuthorizationHeader(user.token)
  }

  setAuthorizationHeader = token => {
    this.api.attachHeaders({
      Authorization: token
    })
  }

  destroySession = async () => {
    await AsyncStorage.clear()
    this.api.removeHeaders(['Authorization'])
  }

  logIn = async ({email, password}) => {
    const { data } = await this.apiClient.post(API_ENDPOINTS.LOGIN, { email, password })
    await this.createSession(data)
    return data
  }
}
export default new AuthService()
