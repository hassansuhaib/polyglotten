import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Typography } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import HeadsetIcon from '@material-ui/icons/Headset'

const useStyles = makeStyles((theme) => ({}))

const ActiveChannel = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Voice Channels'
  }, [])

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Voice Channels</Typography>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Typography variant="h5">Is it worth learning Spanish?</Typography>
            <div style={{ background: 'blue', borderRadius: '20px' }}>
              English
            </div>
          </div>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            User 1
          </Grid>
          <Grid item xs={6}>
            User 2
          </Grid>
          <Grid item xs={6}>
            User 3
          </Grid>
          <Grid item xs={6}>
            User 4
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div>
            <IconButton component={RouterLink} to="/">
              <HighlightOffIcon />
            </IconButton>
            <IconButton>
              <MicOffIcon />
            </IconButton>
            <IconButton>
              <HeadsetIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
export default ActiveChannel
