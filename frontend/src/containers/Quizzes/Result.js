import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}))

const Result = (props) => {
  const classes = useStyles()
  return (
    <div>
      <Box boxShadow={3} p={5}>
        <h1>Quiz</h1>
        <Grid>
          <Grid item xs={12}>
            Part 2 of 2: Translation
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Result</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Vocabulary: 1/10</Typography>
            <Typography>Translation: 2/10</Typography>
            <Typography>Status: Failed Idiot!</Typography>
          </Grid>
          <Grid container item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={RouterLink}
              to="/"
            >
              Go Home
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
export default Result
