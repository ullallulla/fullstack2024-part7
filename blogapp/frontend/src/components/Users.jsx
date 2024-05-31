import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/userReducer'
import userService from '../services/users'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TableCell, TableContainer, TableRow, Table, TableBody, Paper, TableHead } from '@mui/material'

const Users = () => {

  const users = useSelector(state => state.user.users)

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>
                name
              </TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) =>
              <TableRow key={user.id} >
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users