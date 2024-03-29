import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from '../../store/actions/auth'
import SideDrawer from './SideDrawer'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Hidden from '@material-ui/core/Hidden'
import { Container } from '@material-ui/core'

import { AppBar, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: '#fff',
    color: 'primary',
  },
  appbarTitle: {
    textDecoration: 'none',
    color: 'primary',
    [theme.breakpoints.down('md')]: {
      flex: '1',
    },
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
      <AppBar className={classes.appbar} elevation={1}>
        <Container disableGutters>
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
            <Hidden lgUp>
              <SideDrawer />
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Nav
