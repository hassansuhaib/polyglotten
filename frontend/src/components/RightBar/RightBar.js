import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from '../../store/actions/auth'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import SubjectIcon from '@material-ui/icons/Subject'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ForumIcon from '@material-ui/icons/Forum'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'fixed',
  },
  heading: {
    textAlign: 'left',
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
}))

const SideBar = () => {
  const classes = useStyles()
  return (
    <div className={classes.sidebar}>
      <div className={classes.heading}>
        <Typography variant="h6" component="p">
          Recommended Users
        </Typography>
      </div>

      <List>
        <ListItem button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Imtinan" />
        </ListItem>
        <ListItem button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Usman" />
        </ListItem>
        <ListItem button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Ahmed" />
        </ListItem>
        <ListItem button component={RouterLink} to={`/profile`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Hamza" />
        </ListItem>
      </List>
    </div>
  )
}
export default SideBar
