import React from 'react'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  pagewrap: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    flexGrow: '1',
  },
}))

const Layout = (props) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.pagewrap}>
        <Nav />
        <div className={classes.main}>{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  )
}

export default Layout
