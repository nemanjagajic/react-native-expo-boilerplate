import { all, takeLatest, call, put } from 'redux-saga/effects'
import { LOG_IN, LOG_OUT, SET_ACTIVE_USER } from './authConstants'
import authService from '../../services/api/AuthService'
import { removeUser, setLoginFinished, setLoginInProgress, setUser } from './authActions'

export function* logIn$({ payload }) {
  try {
    yield put(setLoginInProgress())
    const data = yield call(authService.logIn, {
      email: payload.email,
      password: payload.password
    })
    yield call(setActiveUser$, {
      payload: {
        user: data,
        navigateHome: payload.navigateHome
      }
    })
  } catch (e) {
    console.log(e)
  } finally {
    yield put(setLoginFinished())
  }
}

export function* logOut$({ payload }) {
  try {
    yield call(authService.destroySession)
    yield put(removeUser())
    payload.navigateAuth()
  } catch (e) {
    console.log(e)
  }
}

export function* setActiveUser$({ payload }) {
  yield put(setUser(payload.user))
  payload.navigateHome()
}

export default function* authSaga() {
  yield all([
    takeLatest(LOG_IN, logIn$),
    takeLatest(LOG_OUT, logOut$),
    takeLatest(SET_ACTIVE_USER, setActiveUser$)
  ])
}
