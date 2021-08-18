import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import LeftBar from '../../components/SideBars/LeftBar'
import ContactList from './ContactList'
import CreateChat from './CreateChat'
import Chat from './Chat'

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

const Chats = (props) => {
  const classes = useStyles()
  const view = props.match.params.view
  const username = props.match.params.username
  const chatId = props.match.params.id
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Chats'
  }, [])

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  const renderView = () => {
    switch (view) {
      case `user`:
        return <Chat chatID={chatId} username={username} />
      case 'create':
        return <CreateChat />
      default:
        return <ContactList username={username} />
    }
  }

  const renderList = () => {
    return (
      <React.Fragment>
        <List className={classes.fixed} disablePadding>
          <Typography variant="h5">Chats</Typography>
          <ListItem
            disableGutters
            button
            component={RouterLink}
            to={`/settings/account`}
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="Account Settings" />
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
            <Grid item xs={12} md={4} lg={6}>
              {renderView()}
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  )
}
export default Chats
