import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import { useDispatch } from 'react-redux'
import { deleteBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, handleVote }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'
  const comments = blog.comments
  console.log(comments, 'blog comments')
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

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  console.log(blog.user, storage.me(), canRemove)

  return (
    <div className='blog'>

      <h1>{blog.title} by {blog.author}</h1>

      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
            likes {blog.likes}
          <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
              like
          </button>
        </div>
        <div>added by {nameOfUser}</div>
        {canRemove && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
        <h3>comments</h3>
        <div>

          <form onSubmit={addComment}>
            <div>
              <input
                type='text'
                name='content'
              />
            </div>
            <button type='submit'>add comment</button>
          </form>
        </div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div>
              <li>{comment.content}</li>
            </div>
          </div>
        ))}
      </div>

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
