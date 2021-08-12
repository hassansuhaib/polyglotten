import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import LeftBar from '../SideBars/LeftBar'
import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem } from '@material-ui/core'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Menu from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  list: {
    minWidth: 250,
    paddingLeft: theme.spacing(1),
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
        <div onClick={toggleDrawer(false)}>
          <LeftBar styling={classes.list} />
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  )
}
export default SideDrawer
