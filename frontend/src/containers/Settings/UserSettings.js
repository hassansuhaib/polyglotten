import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({}))

const UserSettings = ({ content }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <h1>Account Settings</h1>
      <List>
        <ListItem button component={RouterLink} to="/settings/account/username">
          <ListItemText primary="Username" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings/account/email">
          <ListItemText primary="Email" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings/account/password">
          <ListItemText primary="Password" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings/account/delete">
          <ListItemText primary="Delete" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings/account/logout">
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </React.Fragment>
  )
}
export default UserSettings
