import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import Footer from '../../components/Footer/Footer'
import { Container, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *': {
      margin: '10px',
    },
  },
}))

const Home = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container>
          <Grid
            container
            direction="column"
            alignContent="center"
            justifyContent="center"
          >
            <Grid item className={classes.text} xs={12}>
              <Typography variant="h2" component="h3">
                Polyglotten
              </Typography>
            </Grid>
            <Grid item className={classes.text} xs={12}>
              <Typography variant="h4" component="h3">
                Time to Immerse!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={RouterLink}
                  to="/login"
                >
                  Get Started
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  component={RouterLink}
                  to="/login"
                >
                  Already a User?
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Home
