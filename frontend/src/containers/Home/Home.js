import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Feed from '../Feed/Feed'
import Quizzes from '../Quizzes/Quizzes'
import VoiceChannels from '../VoiceChannels/ActiveChannel'
import Profile from '../Profile/Profile'
import Search from '../Search/Search'
import Notifications from '../Notifications/Notifications'
import MessageList from '../Messages/MessageList'

import LeftBar from '../../components/SideBars/LeftBar'
import RightBar from '../../components/SideBars/RightBar'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { Container, Hidden, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    textAlign: 'center',
    minHeight: '92vh',
  },
  toolbar: theme.mixins.toolbar,
  leftBar: {
    position: 'fixed',
  },
}))

const Home = (props) => {
  const classes = useStyles()
  const view = props.match.params.view
  const username = props.match.params.username

  const renderView = () => {
    switch (view) {
      case 'voice-channels':
        return <VoiceChannels />
      case 'search':
        return <Search />
      case 'profile':
        return <Profile username={username} />
      case 'notifications':
        return <Notifications />
      case 'messages':
        return <MessageList username={username} />
      default:
        return <Feed />
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <Container>
        <Grid container>
          <Hidden mdDown>
            <Grid item className={classes.text} xs={12} md={4} lg={3}>
              <LeftBar styling={classes.leftBar} />
            </Grid>
          </Hidden>
          <Grid item className={classes.text} xs={12} md={8} lg={6}>
            {renderView()}
          </Grid>
          <Hidden mdDown>
            <Grid item className={classes.text} xs={12} md={4} lg={3}>
              <RightBar />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  )
}

export default Home
