import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'
import { Button, TextField } from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const doLogin = (event) => {
    event.preventDefault()
    dispatch(handleLogin({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={doLogin}>
      <TextField label='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type='submit' variant='contained' color='secondary'>Login</Button>
    </form>
  )
}

export default Login
