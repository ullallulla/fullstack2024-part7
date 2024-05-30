import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import userService from '../services/users'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {

  const users = useSelector(state => state.user.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>
            </td>
            <td><strong>blogs created</strong></td>
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