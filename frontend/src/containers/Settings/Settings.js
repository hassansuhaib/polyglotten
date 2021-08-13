import React, { useEffect } from 'react'

import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}))

const Settings = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Settings'
  }, [])
  return (
    <div>
      <div className={classes.toolbar} />
      <Container>
        <Grid container>
          <Hidden mdDown>
            <Grid item className={classes.text} xs={12} md={4} lg={3}>
              <Typography variant="h4">Settings</Typography>
            </Grid>
          </Hidden>
          <Grid item className={classes.text} xs={12} md={8} lg={6}>
            <Typography variant="h4">Options</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Settings
