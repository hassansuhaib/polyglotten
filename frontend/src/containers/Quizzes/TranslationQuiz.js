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

const TranslationQuiz = (props) => {
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
            Part 2 of 2: Translation
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Translate the following</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Hola hermano, necesito tu ayuda ahore mismo.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12}>
            <div className={classes.navigation}>
              <Button variant="contained">Previous</Button>
              <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/tests/result"
              >
                Finish
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
export default TranslationQuiz
