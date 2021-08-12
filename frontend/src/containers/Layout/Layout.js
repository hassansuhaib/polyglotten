import React from 'react'
import Nav from '../../components/Nav/Nav'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  main: {
    '& > *': {
      minHeight: '100vh',
    },
  },
}))

const Layout = (props) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Nav />
      <div className={classes.main}>{props.children}</div>
    </React.Fragment>
  )
}

export default Layout
