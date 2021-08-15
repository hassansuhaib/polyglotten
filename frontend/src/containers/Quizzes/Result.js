import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import { CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}))

const Result = ({ qState, qSetState }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    result: null,
  })

  console.log('Quiz State in Results: ', qState)

  useEffect(() => {
    api
      .post(urls.quizComplete, qState)
      .then((response) => {
        setState({ result: response.data })
      })
      .catch((error) => console.log(error))
  }, [])

  const renderResult = () => {
    if (state.result) {
      return (
        <React.Fragment>
          <Typography>Vocabulary: {state.result.vocabulary}/10</Typography>
          <Typography>Translation: {state.result.translation}/10</Typography>
          <Typography>
            Status: {state.result.status ? 'Passed' : 'Failed'}
          </Typography>
        </React.Fragment>
      )
    } else {
      return <CircularProgress />
    }
  }

  return (
    <div>
      <Box boxShadow={3} p={5}>
        <Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Result</Typography>
          </Grid>
          <Grid item xs={12}>
            {renderResult()}
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
