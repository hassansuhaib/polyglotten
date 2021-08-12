import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from '../../store/actions/auth'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

import { AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: 'white',
    color: 'primary',
  },
  appbarTitle: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'primary',
  },
  title: {
    marginLeft: theme.spacing(2),
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
    <div>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Link component={RouterLink} to="/" className={classes.appbarTitle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={process.env.PUBLIC_URL + '/assets/logos/logo192.png'}
                alt="logo"
                width="28"
              />
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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
