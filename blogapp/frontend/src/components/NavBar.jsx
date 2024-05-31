import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import { AppBar,Container, Toolbar, Button, Box } from '@mui/material'

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
    <AppBar position="static" color='secondary'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {/* <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link> */}
          <Box sx={{ ml: 'auto' }}></Box>
          {user.name} logged in
          <Button variant="outlined" color="error" onClick={doLogout}>logout</Button>
          {/* <button onClick={doLogout}>logout</button> */}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavBar