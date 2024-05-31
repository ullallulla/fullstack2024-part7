import { Button } from '@mui/material'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} color='secondary'>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant='outlined' color='error'>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
