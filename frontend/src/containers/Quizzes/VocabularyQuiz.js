import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { capitalize } from '../../utils'
import history from '../../history'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles((theme) => ({
  navigation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}))

const VocabularyQuiz = ({ questions, qState, qSetState }) => {
  const classes = useStyles()

  const [state, setState] = useState({
    step: 0,
    selectedOption: '',
    vocabulary_answers: [],
  })

  const handleChange = (event) => {
    setState({
      ...state,
      selectedOption: event.target.value,
    })
  }

  const handleNext = () => {
    if (state.step < questions.length - 1) {
      setState({
        ...state,
        selectedOption: '',
        step: ++state.step,
        vocabulary_answers: state.vocabulary_answers.concat(
          state.selectedOption
        ),
      })
    } else {
      qSetState({
        ...qState,
        vocabulary_answers: state.vocabulary_answers.concat(
          state.selectedOption
        ),
      })
      history.push('translation')
    }
  }

  const renderOptions = () => {
    return (
      <React.Fragment>
        <FormControlLabel
          value={questions[state.step].choice_1}
          control={<Radio />}
          label={capitalize(questions[state.step].choice_1)}
        />
        <FormControlLabel
          value={questions[state.step].choice_2}
          control={<Radio />}
          label={capitalize(questions[state.step].choice_2)}
        />
        <FormControlLabel
          value={questions[state.step].choice_3}
          control={<Radio />}
          label={capitalize(questions[state.step].choice_3)}
        />
        <FormControlLabel
          value={questions[state.step].choice_4}
          control={<Radio />}
          label={capitalize(questions[state.step].choice_4)}
        />
      </React.Fragment>
    )
  }

  return (
    <div>
      <Box boxShadow={3} p={5}>
        <Grid>
          <Grid item xs={12}>
            Part 1 of 2: Vocabulary
          </Grid>
          <Grid item xs={12}>
            <Typography>
              What is the word in English for "
              {capitalize(questions[state.step].word)}"?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="answer options"
                name="vocabulary"
                value={state.selectedOption}
                onChange={handleChange}
              >
                {renderOptions()}
              </RadioGroup>
            </FormControl>
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
export default VocabularyQuiz
