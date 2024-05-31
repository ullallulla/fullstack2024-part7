import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { Link } from 'react-router-dom'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import FeedIcon from '@mui/icons-material/Feed'

const BlogList = ({ blogFormRef }) => {
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
      <List>
        {[...blogs].sort(byLikes).map((blog) => (
          <div key={blog.id}>
            <ListItem>
              <ListItemIcon>
                <FeedIcon />
              </ListItemIcon>
              <ListItemButton
                component={Link}
                to={`/blogs/${blog.id}`}>
                <ListItemText primary={`${blog.title} by ${blog.author}`} />

              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  )
}

export default BlogList