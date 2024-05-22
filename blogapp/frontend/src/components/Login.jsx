import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'

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
      <label>
        Username:
        <input
          type='text'
          data-testid='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type='password'
          value={password}
          data-testid='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type='submit' value='Login' />
    </form>
  )
}

export default Login
