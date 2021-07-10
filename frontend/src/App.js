import React from 'react'
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'

const App = () => {
  return (
    <div className="App">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  )
}

export default App
