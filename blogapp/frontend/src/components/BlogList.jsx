import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { Link } from 'react-router-dom'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ blogFormRef, handleVote }) => {
  const blogs = useSelector(state => state.blogs)

  const byLikes = (a, b) => b.likes - a.likes

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog blogFormRef={blogFormRef} />
      </Togglable>
      {[...blogs].sort(byLikes).map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <div style={style}>
              {blog.title} by {blog.author}
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList