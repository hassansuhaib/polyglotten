import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({}))

const NotificationSettings = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <h1>Notification Settings</h1>
      <List>
        <ListItem
          button
          component={RouterLink}
          to="/settings/notifications/add"
        >
          <ListItemText primary="All Notifications" />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/settings/notifications/remove"
        >
          <ListItemText primary="Friend Request Notifications" />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/settings/notifications/remove"
        >
          <ListItemText primary="New Post Notifications" />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/settings/notifications/remove"
        >
          <ListItemText primary="Upvote Notifications" />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/settings/notifications/remove"
        >
          <ListItemText primary="Comment Notifications" />
        </ListItem>
        <ListItem
          button
          component={RouterLink}
          to="/settings/notifications/remove"
        >
          <ListItemText primary="Recommended Posts Notifications" />
        </ListItem>
      </List>
    </React.Fragment>
  )
}
export default NotificationSettings
