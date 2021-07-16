import React from 'react'
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'

import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

// For using custom font
import '@fontsource/quicksand'

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
