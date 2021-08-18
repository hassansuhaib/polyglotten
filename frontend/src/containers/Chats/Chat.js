import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import WebSocketInstance from '../../webSocket'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  chatSection: {
    height: '92vh',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
  hr: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}))

const Chat = ({ chatID, username }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const messages = useSelector((state) => state.message.messages)
  const [state, setState] = useState({
    message: '',
  })

  console.log('Chat state: ', state)
  console.log('chatID: ', chatID)

  const waitForSocketConnection = (callback) => {
    setTimeout(() => {
      if (WebSocketInstance.state() === 1) {
        console.log('Connection is made')
        callback()
        return
      } else {
        console.log('Chat ID: ', chatID)
        console.log('Waiting for connection...')
        waitForSocketConnection(callback)
      }
    }, 100)
  }

  useEffect(() => {
    const initializeChat = () => {
      waitForSocketConnection(() => {
        WebSocketInstance.fetchMessages(username, chatID)
      })
      WebSocketInstance.connect(chatID)
    }
    initializeChat()
  }, [])

  const handleChange = (e) => {
    setState({ ...state, message: e.target.value })
  }

  const sendMessage = () => {
    const messageObject = {
      from: user.username,
      content: state.message,
      chatId: chatID,
    }
    WebSocketInstance.newChatMessage(messageObject)
    setState({ ...state, message: '' })
  }

  const renderTimestamp = (timestamp) => {
    let prefix = ''
    const timeDiff = Math.round(
      (new Date().getTime() - new Date(timestamp).getTime()) / 60000
    )
    if (timeDiff < 1) {
      // less than one minute ago
      prefix = 'just now...'
    } else if (timeDiff < 60 && timeDiff > 1) {
      // less than sixty minutes ago
      prefix = `${timeDiff} minutes ago`
    } else if (timeDiff < 24 * 60 && timeDiff > 60) {
      // less than 24 hours ago
      prefix = `${Math.round(timeDiff / 60)} hours ago`
    } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
      // less than 7 days ago
      prefix = `${Math.round(timeDiff / (60 * 24))} days ago`
    } else {
      prefix = `${new Date(timestamp)}`
    }
    return prefix
  }

  const renderMessages = () => {
    console.log('Messages: ', messages)
    return messages.map((message, i, arr) => (
      <ListItem
        key={message.id}
        style={{ marginBottom: arr.length - 1 === i ? '300px' : '15px' }}
      >
        <Grid container>
          <Grid item xs={12}>
            <ListItemText
              align={message.author === user.username ? 'right' : 'left'}
              primary={message.content}
              secondary={renderTimestamp(message.timestamp)}
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    ))
  }

  return (
    <div>
      <Paper elevation={3} className={classes.chatSection}>
        <Grid container>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h5">{username}</Typography>
              <div className={classes.hr}>
                <hr />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <List className={classes.messageArea}>{renderMessages()}</List>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              <TextField
                fullWidth
                name="message"
                placeholder="Write something"
                onChange={handleChange}
                label="Message"
              />
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                size="small"
                value={state.message}
                onClick={sendMessage}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default Chat
