import React from 'react'
import WebSocketInstance from '../../webSocket'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => ({
  chatSection: {
    height: '90vh',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  messageArea: {
    height: '78vh',
    overflowY: 'auto',
  },
}))

const Chat = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.chatSection}>
      <Grid container>
        <Grid item container>
          <Grid item xs={6}>
            <Typography variant="h5">Timothy Hawk</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Online</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <List className={classes.messageArea}>
            <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, what's up?"
                  ></ListItemText>
                  <ListItemText align="right" primary="9:00pm"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Nothing much, wby?"
                  ></ListItemText>
                  <ListItemText align="left" primary="9:01pm"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={11}>
            <TextField fullWidth label="Message" />
          </Grid>
          <Grid item xs={1} align="right">
            <Fab color="primary" aria-label="add" size="small">
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default Chat
