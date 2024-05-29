import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'

const NavBar = () => {
  const padding = {
    paddingRight: 5
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.loggedInUser)
  const doLogout = () => {
    dispatch(handleLogout(user))
  }
  return (
    <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>

      {user.name} logged in
      <button onClick={doLogout}>logout</button>

    </div>
  )
}

export default NavBar