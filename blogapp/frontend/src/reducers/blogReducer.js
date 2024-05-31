import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const { id } = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    addComment(state, action) {
      const updatedBlog = action.payload
      return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
    },
    voteBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
    }
  }
})

export const { setBlog, appendBlog, removeBlog, addComment, voteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`Blog created: ${blog.title}, ${blog.author}`, 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 5, 'error'))
    }

  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog))
    }
  }
}

export const createComment = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.createComment(blog.id, comment)
    dispatch(addComment(updatedBlog))
  }
}

export const handleVote = (blog) => {
  return async dispatch => {
    console.log('updating', blog)
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(voteBlog(updatedBlog))
  }
}

export default blogSlice.reducer