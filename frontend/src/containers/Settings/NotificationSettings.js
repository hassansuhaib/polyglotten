import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({}))

const NotificationSettings = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    id: '',
    every: true,
    posts: true,
    upvotes: true,
    recommended: true,
  })

  console.log('Notification Settings State: ', state)
  const updateNotifications = () => {
    api
      .patch(urls.notificationSettingsUpdate(state.id), state)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }

  const hem = () => {
    updateNotifications()
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
    hem()
  }

  useEffect(() => {
    const getProfileSettings = () => {
      api
        .get(urls.notificationSettings)
        .then((response) => setState({ ...state, ...response.data }))
        .catch((error) => console.log(error))
    }
    getProfileSettings()
  }, [])

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Notification Settings</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <FormGroup column>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.every}
                onChange={handleChange}
                name="every"
                color="primary"
              />
            }
            label="All Notifications"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.posts}
                onChange={handleChange}
                name="posts"
                color="primary"
              />
            }
            label="New Posts"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.upvotes}
                onChange={handleChange}
                name="upvotes"
                color="primary"
              />
            }
            label="Upvotes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.recommended}
                onChange={handleChange}
                name="recommended"
                color="primary"
              />
            }
            label="Primary"
          />
        </FormGroup>
      </Grid>
    </React.Fragment>
  )
}
export default NotificationSettings
