import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/actions/auth'

import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Menu from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import SubjectIcon from '@material-ui/icons/Subject'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ForumIcon from '@material-ui/icons/Forum'

const useStyles = makeStyles((theme) => ({
  list: {
    minWidth: 250,
    paddingLeft: theme.spacing(1),
  },
}))

const SideDrawer = () => {
  const classes = useStyles()
  const [state, setState] = useState({ left: false })
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ left: open })
  }

  return (
    <React.Fragment>
      <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
        <Menu fontSize="large" />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div onClick={toggleDrawer(false)}>
          <List className={classes.list} disablePadding>
            <ListItem
              disableGutters
              button
              component={RouterLink}
              to={`/profile/${auth.user ? auth.user.username : ''}`}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem
              disableGutters
              button
              component={RouterLink}
              to={`/voice-channels`}
            >
              <ListItemIcon>
                <VolumeUpIcon />
              </ListItemIcon>
              <ListItemText primary="Voice Channels" />
            </ListItem>
            <ListItem
              disableGutters
              button
              component={RouterLink}
              to={`/tests`}
            >
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary="Assessment Tests" />
            </ListItem>
            <ListItem
              disableGutters
              button
              component={RouterLink}
              to={`/forum`}
            >
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="Forum" />
            </ListItem>
            <ListItem
              disableGutters
              button
              component={RouterLink}
              to={`/settings`}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem disableGutters button onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  )
}
export default SideDrawer
