import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Button, Typography } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}))

const Start = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    language: '',
    level: '',
  })

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div>
      <h1>Start</h1>
      <Box boxShadow={3} p={5}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-language">Select Language</InputLabel>
              <Select
                labelId="select-language"
                id="language-select"
                value={state.language}
                onChange={handleChange}
              >
                <MenuItem value={'Spanish'}>Spanish</MenuItem>
                <MenuItem value={'German'}>German</MenuItem>
                <MenuItem value={'Mandarin'}>Mandarin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-language">Select Level</InputLabel>
              <Select
                labelId="select-language"
                id="language-select"
                value={state.level}
                onChange={handleChange}
              >
                <MenuItem value={'B'}>Beginner</MenuItem>
                <MenuItem value={'I'}>Intermediate</MenuItem>
                <MenuItem value={'A'}>Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/tests/vocabulary"
            >
              Let's Start!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
export default Start
