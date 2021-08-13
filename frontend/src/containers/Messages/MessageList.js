import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Message from './Message'
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

const Messages = ({ username }) => {
  const classes = useStyles()

  const renderMessage = () => {
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

  const renderManyMessages = () => {
    let messages = []
    for (let i = 0; i < 10; i++) {
      messages.push(renderMessage())
    }
    return messages
  }

  const renderChat = () => {
    return (
      <div>
        <h1>Chat!</h1>
      </div>
    )
  }

  return (
    <List className={classes.root}>
      {username ? renderChat() : renderManyMessages()}
    </List>
  )
}
export default Messages
