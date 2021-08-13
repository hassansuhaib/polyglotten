import React from 'react'
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

  const renderNotification = () => {
    return (
      <React.Fragment>
        <ListItem
          button
          component={RouterLink}
          to="/messages/username"
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <h1>Notifications</h1>
      <List className={classes.root}>
        {renderNotification()}
        {renderNotification()}
        {renderNotification()}
        {renderNotification()}
        {renderNotification()}
        {renderNotification()}
        {renderNotification()}
        {renderNotification()}
        {renderNotification()}
      </List>
    </React.Fragment>
  )
}
export default Notifications
