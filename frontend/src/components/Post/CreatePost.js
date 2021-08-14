import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

import Upload from './Upload'

const useStyles = makeStyles((theme) => ({
  invite: {
    minWidth: 400,
  },
  createPost: {
    padding: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
}))

const CreatePost = (props) => {
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
    <div className={classes.createPost}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography variant="h3">Create a Post</Typography>
        </Grid>
        <Grid item xs={12} className={classes.invite}>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className={classes.invite}>
          <div className={classes.buttons}>
            <Upload />
            <Button variant="contained" color="primary">
              Post
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default CreatePost
