import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import history from '../../history'

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

const TranslationQuiz = ({ translations, qState, qSetState }) => {
  const classes = useStyles()

  const [state, setState] = useState({
    step: 0,
    translation: '',
    translation_answers: [],
  })

  const handleChange = (event) => {
    setState({
      ...state,
      translation: event.target.value,
    })
  }

  const handleNext = () => {
    if (state.step < translations.length - 1) {
      setState({
        ...state,
        translation: '',
        step: ++state.step,
        translation_answers: state.translation_answers.concat(
          state.translation
        ),
      })
    } else {
      qSetState({
        ...qState,
        translation_answers: state.translation_answers.concat(
          state.translation
        ),
      })
      history.push('result')
    }
  }

  return (
    <div>
      <Box boxShadow={3} p={5}>
        <Grid>
          <Grid item xs={12}>
            Part 2 of 2: Translation
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Translate the following</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{translations[state.step].sentence}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              name="translation"
              variant="outlined"
              value={state.translation}
              onChange={handleChange}
            />
          </Grid>
          <Grid container item xs={12}>
            <div className={classes.navigation}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
export default TranslationQuiz
