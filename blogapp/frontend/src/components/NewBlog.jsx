import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, TextField } from '@mui/material'
import { Typography } from '@mui/material'

const NewBlog = ({ blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, url, author }))
    blogFormRef.current.toggleVisibility()
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <Typography variant='h5'>
        Create a New Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label='Title' value={title} onChange={handleTitleChange}/>
        </div>
        <div>
          <TextField label='URL' value={url} onChange={handleUrlChange}/>
        </div>
        <div>
          <TextField label='Author' value={author} onChange={handleAuthorChange}/>
        </div>
        <Button type='submit' variant='contained' color='secondary'>Create</Button>
      </form>
    </div>
  )
}

export default NewBlog
