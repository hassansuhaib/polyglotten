import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from '../../store/actions/auth'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'fixed',
    paddingLeft: theme.spacing(2),
  },
  heading: {},
}))

const RightBar = () => {
  const classes = useStyles()
  return (
    <div className={classes.sidebar}>
      <List
        aria-labelledby="nested-list-subheader"
        disablePadding
        subheader={
          <Typography variant="h6" component="p" id="nested-list-subheader">
            Recommended Users
          </Typography>
        }
      >
        <ListItem disableGutters button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Imtinan" />
        </ListItem>
        <ListItem disableGutters button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usman" />
        </ListItem>
        <ListItem disableGutters button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Ahmed" />
        </ListItem>
        <ListItem disableGutters button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Hamza" />
        </ListItem>
      </List>
    </div>
  )
}
export default RightBar
