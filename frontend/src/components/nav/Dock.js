import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChatIcon from '@material-ui/icons/Chat'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import { List, ListItem, ListItemText } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  grow: {
    flexGrow: 1,
  },
  dockButton: {
    flexGrow: '0.2',
    borderRadius: '0',
  },
  list: {
    position: 'absolute',
    zIndex: 2,
    top: -140,
    left: 120,
    margin: '0 auto',
  },
}))

const Dock = () => {
  const classes = useStyles()
  const [state, setState] = useState({ listOpen: false })
  const renderAddList = () => {
    return (
      <List>
        <ListItem button component={RouterLink} to="/create-post">
          <ListItemText primary="Create a New Post" />
        </ListItem>
        <ListItem button component={RouterLink} to="/ask-question">
          <ListItemText primary="Ask a Question" />
        </ListItem>
      </List>
    )
  }

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Go To Home"
          edge="start"
          className={classes.dockButton}
          component={RouterLink}
          to="/"
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="Open Search"
          className={classes.dockButton}
          component={RouterLink}
          to="/search"
        >
          <SearchIcon />
        </IconButton>
        <Grow in={state.listOpen}>
          <div className={classes.list}>{renderAddList()}</div>
        </Grow>
        <ClickAwayListener onClickAway={() => setState({ listOpen: false })}>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon onClick={() => setState({ listOpen: !state.listOpen })} />
          </Fab>
        </ClickAwayListener>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          aria-label="Open Notifications"
          className={classes.dockButton}
          component={RouterLink}
          to="/notifications"
        >
          <NotificationsIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="Open Messages"
          className={classes.dockButton}
          edge="end"
          component={RouterLink}
          to="/messages"
        >
          <ChatIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
export default Dock
