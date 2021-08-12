import React from 'react'
import Nav from '../../components/Nav/Nav'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  main: {
    '& > *': {
      minHeight: '100vh',
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
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
