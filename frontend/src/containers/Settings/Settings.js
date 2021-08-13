import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import AccountSettings from './AccountSettings'
import NotificationSettings from './NotificationSettings'
import LanguageSettings from './LanguageSettings'
import InterestSettings from './InterestSettings'
import LeftBar from '../../components/SideBars/LeftBar'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  fixed: {
    position: 'fixed',
  },
  settings: {
    minHeight: '92vh',
  },
  leftBar: {
    position: 'fixed',
  },
}))

const Settings = (props) => {
  const classes = useStyles()
  const view = props.match.params.view
  const subview = props.match.params.subview

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Settings'
  }, [])

  const renderView = () => {
    switch (view) {
      case 'notifications':
        return <NotificationSettings view={subview} />
      case 'languages':
        return <LanguageSettings view={subview} />
      case 'interests':
        return <InterestSettings view={subview} />
      default:
        return <AccountSettings view={subview} />
    }
  }

  const renderList = () => {
    return (
      <React.Fragment>
        <List className={classes.fixed} disablePadding>
          <Typography variant="h5">Settings</Typography>
          <ListItem
            disableGutters
            button
            component={RouterLink}
            to={`/settings/account`}
          >
            <ListItemText primary="Account Settings" />
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            disableGutters
            button
            component={RouterLink}
            to={`/settings/languages`}
          >
            <ListItemText primary="Language Settings" />
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            disableGutters
            button
            component={RouterLink}
            to={`/settings/interests`}
          >
            <ListItemText primary="Interest Settings" />
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            disableGutters
            button
            component={RouterLink}
            to={`/settings/notifications`}
          >
            <ListItemText primary="Notification Settings" />
            <ListItemIcon>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </React.Fragment>
    )
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Container>
        <Grid container>
          <Grid item xs={12} md={4} lg={3}>
            <LeftBar styling={classes.leftBar} />
          </Grid>
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
