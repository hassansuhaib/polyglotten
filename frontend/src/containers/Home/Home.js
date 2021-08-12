import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Feed from '../../components/Feed/Feed'
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

const Home = () => {
  const classes = useStyles()
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
            <Feed />
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
