import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Feed from '../Feed/Feed'
import Settings from '../Settings/Settings'
import Forum from '../Forum/Forum'
import Quizzes from '../Quizzes/Quizzes'
import VoiceChannels from '../VoiceChannels/VoiceChannels'
import Profile from '../Profile/Profile'

import LeftBar from '../../components/SideBars/LeftBar'
import RightBar from '../../components/SideBars/RightBar'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

import { Container, Hidden, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    textAlign: 'center',
    minHeight: '100vh',
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
  console.log(view)
  console.log('Username: ', username)

  const renderView = () => {
    switch (view) {
      case 'settings':
        return <Settings />
      case 'tests':
        return <Quizzes />
      case 'voice-channels':
        return <VoiceChannels />
      case 'profile':
        return <Profile username={username} />
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
