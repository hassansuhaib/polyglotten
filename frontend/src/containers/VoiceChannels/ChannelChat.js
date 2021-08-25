import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { IconButton, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'
import Paper from '@material-ui/core/Paper'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  chatSection: {
    height: '80vh',
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
  chatLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  chatRight: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  edit: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}))

const ChannelChat = ({ socketRef, roomID }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const [state, setState] = useState({
    message: '',
    messages: [],
  })

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('receive message', (message) => {
        setState({ message: message })
      })
    }
  })

  console.log('Chat state: ', state)

  const handleChange = (e) => {
    console.log(e)
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const sendMessage = () => {
    const messageObject = {
      message: '',
      timestamp: new Date().getTime(),
      author: user.username,
    }
    setState({
      ...state,
      message: '',
    })
  }

  const handlePing = () => {
    console.log('Pinging')
    socketRef.current.emit('message', 'hello', roomID)
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
    console.log('Messages: ', state.messages)
    if (state.messages) {
      return state.messages.map((message, i, arr) => {
        if (message.author === user.username) {
          return (
            <div className={classes.chatRight} key={message.id}>
              <div style={{ display: 'inline' }}>
                <Typography>{message.content}</Typography>
                <Typography variant="caption">
                  {renderTimestamp(message.timestamp)}
                </Typography>
              </div>
            </div>
          )
        } else {
          return (
            <div className={classes.chatLeft} key={message.id}>
              <div style={{ display: 'inline' }}>
                <Typography>{message.content}</Typography>
                <Typography variant="caption">
                  {renderTimestamp(message.timestamp)}
                </Typography>
              </div>
            </div>
          )
        }
      })
    }
  }

  const renderTextField = () => {
    if (state.edit) {
      return (
        <React.Fragment>
          <Paper elevation={2} className={classes.edit}>
            <Typography>
              {state.content.author}: {state.content.message}
            </Typography>
            <IconButton onClick={() => setState({ ...state, edit: false })}>
              <CloseIcon />
            </IconButton>
          </Paper>
          <TextField
            fullWidth
            name="edited_message"
            placeholder="Write something"
            onChange={handleChange}
            label="Message"
            value={state.edited_message}
            onKeyPress={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`)
              if (ev.key === 'Enter') {
                sendMessage()
                ev.preventDefault()
              }
            }}
          />
        </React.Fragment>
      )
    } else {
      return (
        <TextField
          fullWidth
          name="message"
          placeholder="Write something"
          onChange={handleChange}
          label="Message"
          value={state.message}
          onKeyPress={(ev) => {
            console.log(`Pressed keyCode ${ev.key}`)
            if (ev.key === 'Enter') {
              sendMessage()
              ev.preventDefault()
            }
          }}
        />
      )
    }
  }

  return (
    <div>
      <Paper elevation={3} className={classes.chatSection}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.messageArea}>{renderMessages()}</div>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={11}>
              {renderTextField()}
            </Grid>
            <Grid item xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                size="small"
                onClick={handlePing}
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
export default ChannelChat
