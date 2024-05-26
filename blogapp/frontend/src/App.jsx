import { useState, useEffect, createRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useMatch, useNavigate } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeUser, handleLogout } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = createRef()

  const match = useMatch('blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const handleVote = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })

    setNotification(`You liked ${updatedBlog.title} by ${updatedBlog.author}`)
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const doLogout = () => {
    dispatch(handleLogout(user))
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  const byLikes = (a, b) => b.likes - a.likes

  const BlogList = () => {
    return (
      <div>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <NewBlog blogFormRef={blogFormRef} />
        </Togglable>
        {[...blogs].sort(byLikes).map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              <Blog
                key={blog.id}
                blog={blog}
                handleVote={handleVote}
              />
            </Link>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={doLogout}>logout</button>
      </div>
      {/* <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
        />
      ))} */}
      <Routes>
        <Route path="/" element={<BlogList />}/>
        <Route path="/users" element={<Users />}/>
        <Route path="/blogs/:id" element={<Blog blog={blog} handleVote={handleVote}/>} />
        <Route path="/users/:id" element={<User user={user}/>}/>
      </Routes>
    </div>
  )
}

export default App
