import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import userService from '../services/users'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  // const dispatch = useDispatch()
  // const loggedInUser = useSelector(state => state.user)

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  console.log(users)
  return (
    <div>
      {/* <h2>blogs</h2>
      <div>
        {loggedInUser.name} logged in
        <button onClick={() => dispatch(handleLogout(loggedInUser))}>logout</button>
      </div> */}
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>
            </td>
            <td>blogs created</td>
          </tr>
          {users.map((user) =>
            <tr key={user.id}>
              <td>

                <div key={user.id}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </div>
              </td>
              <td>
                <div>{user.blogs.length}</div>
              </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}

export default Users