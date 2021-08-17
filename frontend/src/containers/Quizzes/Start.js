import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import ResultList from './ResultList'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}))

const Start = ({ qState, qSetState }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    language: '',
    level: '',
  })

  console.log('Start state: ', state)

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleStart = () => {
    api
      .get(urls.quiz, {
        params: {
          language: state.language,
          level: state.level,
        },
      })
      .then((response) => {
        console.log(response)
        qSetState({
          ...qState,
          quiz: response.data,
          quiz_id: response.data.id,
        })
      })
      .catch((error) => console.log(error))
      .finally(() => {
        history.push('/tests/vocabulary')
      })
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item align="center" xs={12}>
          <Typography variant="h3">Take an Assessment Test</Typography>
        </Grid>
        <Grid item align="center" xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-language">Select Language</InputLabel>
            <Select
              labelId="select-language"
              id="language"
              name="language"
              value={state.language}
              onChange={handleChange}
            >
              <MenuItem value={'Spanish'}>Spanish</MenuItem>
              <MenuItem value={'German'}>German</MenuItem>
              <MenuItem value={'Mandarin'}>Mandarin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item align="center" xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-level">Select Level</InputLabel>
            <Select
              labelId="select-level"
              id="level"
              name="level"
              value={state.level}
              onChange={handleChange}
            >
              <MenuItem value={'B'}>Beginner</MenuItem>
              <MenuItem value={'I'}>Intermediate</MenuItem>
              <MenuItem value={'A'}>Advanced</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item align="center" xs={12}>
          <Button variant="contained" color="primary" onClick={handleStart}>
            Let's Start!
          </Button>
        </Grid>
        <Grid item align="center" xs={12}>
          <ResultList />
        </Grid>
      </Grid>
    </div>
  )
}
export default Start
