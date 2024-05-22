import { createSlice } from '@reduxjs/toolkit'
import storage from '../services/storage'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'


const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return null
    },
    setUser(state, action) {
      return action.payload
    }
  }
})


export const { login, logout, setUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    if (user) {
      dispatch(setUser(user))
    }
  }
}

export const handleLogin = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch(login(user))
      storage.saveUser(user)
      console.log(user, 'login user')
      dispatch(setNotification(`Welcome back, ${user.name}`, 5))
    } catch (error) {
      dispatch(setNotification('Wrong credentials', 5, 'error'))
    }
  }
}

export const handleLogout = (user) => {
  return async dispatch => {
    dispatch(logout())
    storage.removeUser()
    dispatch(setNotification(`Bye, ${user.name}!`, 5))
  }
}


export default userSlice.reducer