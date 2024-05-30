import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    }
  }
})

export const { setBlog, appendBlog, removeBlog, addComment } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
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

export default blogSlice.reducer