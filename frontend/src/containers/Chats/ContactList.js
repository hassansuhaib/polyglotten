import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'
import * as messageActions from '../../store/actions/message'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { CircularProgress, Grid } from '@material-ui/core'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: '90vh',
  },
  inline: {
    display: 'inline',
  },
  fab: {
    position: 'relative',
    bottom: theme.spacing(10),
    left: theme.spacing(5),
  },
}))

const ContactList = ({ username }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    loading: true,
  })

  console.log('Chats state: ', state)
  const user = useSelector((state) => state.auth.user)
  const chats = useSelector((state) => state.message.chats)

  useEffect(() => {
    setTimeout(() => {
      dispatch(messageActions.getUserChats(user.username))
      setState({ ...state, loading: false })
    }, 500)
  }, [])

  console.log('Chats', chats)

  const getUser = (chat) => {
    return chat.participants.filter(
      (participant) => participant !== user.username
    )
  }

  const renderChats = () => {
    if (state.loading === false && chats.length > 0) {
      return chats.map((chat) => (
        <React.Fragment key={chat.id}>
          <ListItem
            button
            component={RouterLink}
            to={`/chats/user/${getUser(chat)}/${chat.id}`}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={getUser(chat)}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                  {''}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))
    } else if (state.loading === true) {
      return (
        <ListItem alignItems="center">
          <CircularProgress />
        </ListItem>
      )
    } else {
      return (
        <ListItem>
          <ListItemText primary={'No chats yet'} />
        </ListItem>
      )
    }
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <List className={classes.root}>{renderChats()}</List>
          <Fab
            color="primary"
            className={classes.fab}
            component={RouterLink}
            to="chats/create"
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default ContactList
