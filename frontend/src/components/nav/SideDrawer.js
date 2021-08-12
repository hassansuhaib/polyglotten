import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem } from '@material-ui/core'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Menu from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({}))

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
      <Button onClick={toggleDrawer(true)}>
        <IconButton edge="start" aria-label="menu" onClick={toggleDrawer(true)}>
          <Menu fontSize="large" style={{ color: 'white' }} />
        </IconButton>
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <List>
          <ListItem button>Hassan Suhaib</ListItem>
          <ListItem button>Logout</ListItem>
        </List>
      </SwipeableDrawer>
    </React.Fragment>
  )
}
export default SideDrawer
