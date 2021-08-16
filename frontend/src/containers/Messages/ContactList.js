import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { CircularProgress } from '@material-ui/core'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    minHeight: '90vh',
  },
  inline: {
    display: 'inline',
  },
  fab: {
    position: 'relative',
    bottom: theme.spacing(10),
    left: theme.spacing(30),
  },
}))

const ContactList = ({ username }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    chats: [],
    loading: true,
  })
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    const getChats = () => {
      api
        .get(urls.chatsAll, {
          params: {
            username: user.username,
          },
        })
        .then((response) => {
          setState({ ...state, chats: response.data, loading: false })
        })
        .catch((error) => {
          setState({ ...state, loading: false })
          console.log(error)
        })
    }
    setTimeout(() => {
      getChats()
    }, 500)
  }, [])

  const renderChats = () => {
    if (state.loading === false && state.chats.length > 0) {
      state.chats.map((chat) => (
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
      ))
    } else if (state.loading === true) {
      return <CircularProgress />
    } else {
      return <Typography>No chats yet.</Typography>
    }
  }

  return (
    <React.Fragment>
      <div className={classes.parent}>
        <List className={classes.root}>{renderChats()}</List>
        <Fab
          color="primary"
          className={classes.fab}
          component={RouterLink}
          to="/messages-create"
        >
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  )
}
export default ContactList
