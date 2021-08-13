import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({}))

const LanguageSettings = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <h1>Language Settings</h1>
      <List>
        <ListItem button component={RouterLink} to="/settings/languages/add">
          <ListItemText primary="Add Language" />
        </ListItem>
        <ListItem button component={RouterLink} to="/settings/languages/remove">
          <ListItemText primary="Remove Language" />
        </ListItem>
      </List>
    </React.Fragment>
  )
}
export default LanguageSettings
