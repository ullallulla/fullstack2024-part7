import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Container } from '@mui/material'
import store from './store'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Container>
        <App />
      </Container>
    </Router>
  </Provider>
)
