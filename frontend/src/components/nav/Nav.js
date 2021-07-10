import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import logo from './logo192.png'

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const Nav = () => {
  const classes = useStyles()

  return (
    <div className={classes.nav}>
      <Link component={RouterLink} to="/">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="logo" width="28" />
          <Typography variant="h6" className={classes.title}>
            Polyglotten
          </Typography>
        </div>
      </Link>
      <div>
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={RouterLink} to="/register">
          Register
        </Button>
      </div>
    </div>
  )
}

export default Nav
