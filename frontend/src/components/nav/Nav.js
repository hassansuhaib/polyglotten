import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from '../../store/actions/auth'

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
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

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
        {auth.token ? (
          <React.Fragment>
            <Button
              color="primary"
              component={RouterLink}
              to={`/profile/${auth.user.username}`}
            >
              {auth.user.username}
            </Button>
            <Button color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button color="primary" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="primary" component={RouterLink} to="/register">
              Register
            </Button>
          </React.Fragment>
        )}
        <Button color="primary" component={RouterLink} to="/forum">
          Forum
        </Button>
      </div>
    </div>
  )
}

export default Nav
