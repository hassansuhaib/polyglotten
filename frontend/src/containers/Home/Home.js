import React from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const Home = () => {
  return (
    <React.Fragment>
      <Container>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <Button variant="contained">Get Started</Button>
          </Grid>
          <Grid item xs={10}>
            <Button variant="contained">Already a User?</Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Home
