import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  const { message, type } = notification

  const style = {
    backgroundColor: 'lightgrey',
    margin: '10px',
    padding: '10px',
    border: '2px solid',
    borderColor: type === 'success' ? 'green' : 'red',
    borderRadius: '5px',
  }

  if (type === 'error') {
    return (
      <Alert severity='error'>{message}</Alert>
    )
  }

  return (
    <div>
      <Alert severity='success'>{message}</Alert>
    </div>
  )
}

export default Notification
