import { useState, useEffect } from 'react'
import userService from '../services/users'
import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector(state => state.user.users)

  const match = useMatch('users/:id')

  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }
  return (
    <div>
      <h1>
        {user.name}
      </h1>
      <h3>
        <strong>added blogs</strong>
      </h3>
      {user.blogs.map(blog =>
        <li key={blog.id} >
          {blog.title}
        </li>)}
    </div>
  )
}

export default User