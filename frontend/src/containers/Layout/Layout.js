import React from 'react'
import Nav from '../../components/Nav/Nav'
import Dock from '../../components/Nav/Dock'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import { Hidden } from '@material-ui/core'

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
      <Hidden lgUp>
        <Dock />
      </Hidden>
    </React.Fragment>
  )
}

export default Layout
