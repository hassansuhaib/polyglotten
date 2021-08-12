import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem } from '@material-ui/core'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Menu from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  list: {
    minWidth: 250,
  },
}))

const SideDrawer = () => {
  const classes = useStyles()
  const [state, setState] = useState({ left: false })

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
        <List onClick={toggleDrawer(false)} className={classes.list}>
          <ListItem button component={RouterLink} to="/forum">
            Profile
          </ListItem>
          <ListItem button component={RouterLink} to="/forum">
            Voice Channels
          </ListItem>
          <ListItem button component={RouterLink} to="/forum">
            Assessment Tests
          </ListItem>
          <ListItem button component={RouterLink} to="/forum">
            Settings
          </ListItem>
          <ListItem button component={RouterLink} to="/forum">
            Logout
          </ListItem>
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  )
}
export default SideDrawer
