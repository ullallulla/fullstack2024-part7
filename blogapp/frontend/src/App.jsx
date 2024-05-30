import { useState, useEffect, createRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useMatch, useNavigate } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import blogService from './services/blogs'
import Login from './components/Login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import { initializeLoggedInUser, handleLogout, initializeBlogUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import NavBar from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeLoggedInUser())
  }, [])

  useEffect(() => {
    dispatch(initializeBlogUsers())
  })

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user.loggedInUser)

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


  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
      </div>
    )
  }


  return (
    <div>
      <NavBar />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<BlogList blogFormRef={blogFormRef} handleVote={handleVote} />} />
        <Route path="/users" element={<Users />}/>
        <Route path="/blogs/:id" element={<Blog blog={blog} handleVote={handleVote}/>} />
        <Route path="/users/:id" element={<User user={user}/>}/>
      </Routes>
    </div>
  )
}

export default App
