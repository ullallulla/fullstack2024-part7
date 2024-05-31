import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import { useDispatch } from 'react-redux'
import { deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { List, ListItem, ListItemButton, ListItemText, Typography, Box, Grid, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { handleVote } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'
  const comments = blog.comments
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog))
    dispatch(setNotification(`Blog ${blog.title}, by ${blog.author} removed`, 5))
  }

  const addComment = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createComment(blog, { content }))
  }
  const voteBlog = (blog) => {
    dispatch(handleVote(blog))
    dispatch(setNotification(`You liked ${blog.title} by ${blog.author}`, 5))
  }
  const canRemove = blog.user ? blog.user.username === storage.me() : true

  console.log(blog.user, storage.me(), canRemove)

  return (
    <div className='blog'>
      <Typography variant='h4'>
        <strong>{blog.title} by {blog.author}</strong>
      </Typography>
      <Box>
        <Typography component={Link} to={`${blog.url}`}>{blog.url}</Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Typography>likes {blog.likes}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={() => voteBlog(blog)}>
              like
            </Button>
          </Grid>
        </Grid>
        <Typography>added by {nameOfUser}</Typography>
        {canRemove && (
          <Button variant="outlined" color="secondary" onClick={() => handleDelete(blog)}>
            remove
          </Button>
        )}
        <Typography variant="h5">comments</Typography>
        <form onSubmit={addComment}>
          <div>
            <TextField name='content'/>
          </div>
          <Button type='submit' variant="contained" color="secondary">
            add comment
          </Button>
        </form>
      </Box>
      {comments.map((comment) => (
        <Typography key={comment.id}>{comment.content}</Typography>
      ))}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
}

export default Blog
