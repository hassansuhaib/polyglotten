import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

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

const VocabularyQuiz = (props) => {
  const classes = useStyles()

  const [value, setValue] = useState('Belt')

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <div>
      <Box boxShadow={3} p={5}>
        <h1>Quiz</h1>
        <Grid>
          <Grid item xs={12}>
            Part 1 of 2: Vocabulary
          </Grid>
          <Grid item xs={12}>
            <Typography>What is the word in English for "Cinturon"?</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="answer options"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="belt"
                  control={<Radio />}
                  label="Belt"
                />
                <FormControlLabel
                  value="boots"
                  control={<Radio />}
                  label="Boots"
                />
                <FormControlLabel value="mat" control={<Radio />} label="Mat" />
                <FormControlLabel value="tie" control={<Radio />} label="Tie" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid container item xs={12}>
            <div className={classes.navigation}>
              <Button variant="contained">Previous</Button>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/tests/translation"
              >
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
