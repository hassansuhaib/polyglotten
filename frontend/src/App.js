import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authCheckState } from './store/actions/auth'
import Routes from './Routes'
import { Router } from 'react-router-dom'
import history from './history'
import WebSocketInstance from './webSocket'
import * as messageActions from './store/actions/message'

import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { makeStyles } from '@material-ui/core/styles'

// For using custom font
import '@fontsource/quicksand'

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: `url(${
    //   process.env.PUBLIC_URL + '/assets/background/bg.jpg'
    // })`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    backgroundColor: '#e5e5f7',
    backgroundImage: 'radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px)',
    backgroundSize: '10px 10px',
  },
}))

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authCheckState())
  }, [])
  useEffect(() => {
    WebSocketInstance.addCallbacks(
      (message) => dispatch(messageActions.addMessage(message)),
      (messages) => dispatch(messageActions.setMessages(messages))
    )
  })
  return (
    <div className={classes.root}>
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
