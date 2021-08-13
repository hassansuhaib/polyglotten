import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({}))

const InterestSettings = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <h1>Interest Settings</h1>
      <List>
        <ListItem button component={RouterLink} to="/settings/interests/add">
          <ListItemText primary="Add Interest" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings/interests/remove">
          <ListItemText primary="Remove Interest" />
        </ListItem>
      </List>
    </React.Fragment>
  )
}
export default InterestSettings
