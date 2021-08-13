import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import UserSettings from './UserSettings'
import NotificationSettings from './NotificationSettings'
import LanguageSettings from './LanguageSettings'
import InterestSettings from './InterestSettings'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  fixed: {
    position: 'fixed',
  },
  settings: {
    minHeight: '92vh',
  },
}))

const Settings = (props) => {
  const classes = useStyles()
  const view = props.match.params.view

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Settings'
  }, [])

  const renderView = () => {
    switch (view) {
      case 'notifications':
        return <NotificationSettings />
      case 'languages':
        return <LanguageSettings />
      case 'interests':
        return <InterestSettings />
      default:
        return <UserSettings />
    }
  }

  const renderList = () => {
    return (
      <List className={classes.fixed} disablePadding>
        <ListItem
          disableGutters
          button
          component={RouterLink}
          to={`/settings/user-settings`}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Account Settings" />
        </ListItem>
        <ListItem
          disableGutters
          button
          component={RouterLink}
          to={`/settings/languages`}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Language Settings" />
        </ListItem>
        <ListItem
          disableGutters
          button
          component={RouterLink}
          to={`/settings/interests`}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Interest Settings" />
        </ListItem>
        <ListItem
          disableGutters
          button
          component={RouterLink}
          to={`/settings/notifications`}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Notification Settings" />
        </ListItem>
        <ListItem disableGutters button component={RouterLink} to={`/`}>
          <ListItemIcon>
            <ChevronLeftIcon />
          </ListItemIcon>
          <ListItemText primary="Back to Home" />
        </ListItem>
      </List>
    )
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Container>
        <Grid container>
          <Hidden mdDown>
            <Grid item xs={12} md={4} lg={3}>
              {renderList()}
            </Grid>
          </Hidden>
          <Grid item className={classes.settings} xs={12} md={8} lg={6}>
            {renderView()}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Settings
