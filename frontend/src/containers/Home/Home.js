import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Feed from '../../components/Feed/Feed'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import { Container, Hidden, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {},
  text: {
    textAlign: 'center',
    minHeight: '100vh',
    backgroundColor: 'pink',
    border: '2px solid white',
  },
  toolbar: theme.mixins.toolbar,
}))

const Home = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <Container>
        <Grid container>
          <Hidden mdDown>
            <Grid item className={classes.text} xs={12} md={4} lg={3}>
              <Typography variant="h5" component="h3">
                Profile
              </Typography>
            </Grid>
          </Hidden>
          <Grid item className={classes.text} xs={12} md={8} lg={6}>
            <Feed />
          </Grid>
          <Hidden mdDown>
            <Grid item className={classes.text} xs={12} md={4} lg={3}>
              <Typography variant="h5" component="h3">
                Settings
              </Typography>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  )
}

export default Home
