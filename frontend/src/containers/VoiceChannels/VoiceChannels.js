import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import LeftBar from '../../components/SideBars/LeftBar'
import ActiveChannel from './ActiveChannel'
import CreateChannel from './CreateChannel'
import ChannelList from './ChannelList'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  fixed: {
    position: 'fixed',
  },
  channels: {
    minHeight: '92vh',
  },
  leftBar: {
    position: 'fixed',
  },
}))

const VoiceChannels = (props) => {
  const classes = useStyles()
  const view = props.match.params.view

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Settings'
  }, [])

  const renderView = () => {
    switch (view) {
      case 'create':
        return <CreateChannel />
      case 'active':
        return <ActiveChannel />
      default:
        return <ChannelList />
    }
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Container>
        <Grid container>
          <Hidden mdDown>
            <Grid item xs={12} md={4} lg={3}>
              <LeftBar styling={classes.leftBar} />
            </Grid>
          </Hidden>
          <Grid item className={classes.channels} xs={12} md={8} lg={8}>
            {renderView()}
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default VoiceChannels
