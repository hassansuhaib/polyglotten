import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const AccountSettings = ({ view }) => {
  const classes = useStyles()

  const renderOptions = () => {
    return (
      <React.Fragment>
        <Typography variant="h5">Account Settings</Typography>
        <List disablePadding>
          <ListItem
            button
            component={RouterLink}
            to="/settings/account/username"
          >
            <ListItemText primary="Username" />
          </ListItem>
          <ListItem button component={RouterLink} to="/settings/account/email">
            <ListItemText primary="Email" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/settings/account/password"
          >
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

  const renderView = () => {
    switch (view) {
      case 'username':
        return <h3>Username</h3>
      case 'email':
        return <h3>Email</h3>
      case 'password':
        return <h3>Password</h3>
      case 'delete':
        return <h3>Delete Account</h3>
      case 'logout':
        return <h3>Logout</h3>
      default:
        return renderOptions()
    }
  }

  return <React.Fragment>{renderView()}</React.Fragment>
}
export default AccountSettings
