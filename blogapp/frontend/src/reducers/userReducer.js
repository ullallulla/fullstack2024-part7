import { createSlice } from '@reduxjs/toolkit'
import storage from '../services/storage'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'


const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loggedInUser: null
  },
  reducers: {
    login(state, action) {
      state.loggedInUser = action.payload
    },
    logout(state, action) {
      state.loggedInUser = null
    },
    setUsers(state, action) {
      state.users = action.payload
    }
  }
})


export const { login, logout, setUsers } = userSlice.actions

export const initializeLoggedInUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }
}

export const initializeBlogUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
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