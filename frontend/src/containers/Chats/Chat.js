import React from 'react'
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

const Chat = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Paper elevation={3} className={classes.chatSection}>
        <Grid container>
          <Grid item container>
            <Grid item xs={12}>
              <Typography variant="h5">Usman Khan</Typography>
              <div className={classes.hr}>
                <hr />
              </div>
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
      </Paper>
    </div>
  )
}
export default Chat
