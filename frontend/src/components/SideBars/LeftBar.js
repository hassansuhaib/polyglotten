import React from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import SubjectIcon from '@material-ui/icons/Subject'
import ForumIcon from '@material-ui/icons/Forum'
import SearchIcon from '@material-ui/icons/Search'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ChatIcon from '@material-ui/icons/Chat'

import Logout from '../Dialogs/Logout'

const useStyles = makeStyles((theme) => ({
  sidebar: {},
}))

const LeftBar = ({ styling, index }) => {
  const classes = useStyles()
  const auth = useSelector((state) => state.auth)
  return (
    <List className={styling} disablePadding>
      <ListItem disableGutters button component={RouterLink} to={`/`}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem disableGutters button component={RouterLink} to={`/search`}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>
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
      <ListItem disableGutters button component={RouterLink} to={`/chats`}>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItem>
      <ListItem
        disableGutters
        button
        component={RouterLink}
        to={`/notifications`}
      >
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem disableGutters button component={RouterLink} to={`/channels`}>
        <ListItemIcon>
          <VolumeUpIcon />
        </ListItemIcon>
        <ListItemText primary="Voice Channels" />
      </ListItem>
      <ListItem disableGutters button component={RouterLink} to={`/tests`}>
        <ListItemIcon>
          <SubjectIcon />
        </ListItemIcon>
        <ListItemText primary="Assessment Tests" />
      </ListItem>
      <ListItem disableGutters button component={RouterLink} to={`/forum`}>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Forum" />
      </ListItem>
      <ListItem disableGutters button component={RouterLink} to={`/settings`}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
      <Logout />
    </List>
  )
}
export default LeftBar
