import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as urls from '../../constants'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

const Notifications = ({ username }) => {
  const classes = useStyles()
  const [state, setState] = useState(null)
  console.log('Notifications state: ', state)
  useEffect(() => {
    const getNotifications = () => {
      api.get(urls.notifications).then((response) => {
        setState(response.data)
      })
    }
    getNotifications()
  }, [])

  const renderNotification = (notification) => {
    return (
      <React.Fragment key={notification.pk}>
        <ListItem
          button
          component={RouterLink}
          to={notification.url}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText primary={notification.content} />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    )
  }

  const renderAll = () => {
    if (state && state.length > 0) {
      return state.map((notification) => renderNotification(notification))
    } else {
      return <Typography>No notifications to show!</Typography>
    }
  }

  return (
    <React.Fragment>
      <h1>Notifications</h1>
      <List className={classes.root}>{renderAll()}</List>
    </React.Fragment>
  )
}
export default Notifications
