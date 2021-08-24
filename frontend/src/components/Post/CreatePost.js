import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { postApi } from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Paper, Typography } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  createPost: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    '& > *': {
      maxHeight: '100px',
      maxWidth: '100px',
    },
  },
}))

const CreatePost = ({ fState, fSetState }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    image: null,
    content: '',
  })

  const [open, setOpen] = useState(false)

  console.log('CreatePost State: ', state)

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleSubmit = () => {
    let form_data = new FormData()
    if (state.image) {
      form_data.append('image', state.image, state.image.name)
    }
    form_data.append('content', state.content)
    postApi
      .post(urls.postCreate, form_data)
      .then((response) => {
        console.log('Response', response)
        setOpen(true)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setState({
          image: null,
          content: '',
          imageURL: null,
        })
      })
  }

  const handleChange = (event) => {
    setState({
      ...state,
      image: event.target.files[0],
      imageURL: URL.createObjectURL(event.target.files[0]),
    })
  }

  return (
    <div>
      <Paper elevation={2} className={classes.createPost}>
        <Grid container spacing={3}>
          <Grid item align="left" xs={12}>
            <Typography variant="h4">Create a Post</Typography>
          </Grid>
          <Grid item xs={12} className={classes.invite}>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Write something"
              value={state.content}
              onChange={(event) => {
                setState({
                  ...state,
                  content: event.target.value,
                })
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.invite}>
            <div className={classes.buttons}>
              <div>
                <div className={classes.image}>
                  <img src={state.imageURL} />
                </div>
                <input type="file" onChange={handleChange} />
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={state.content ? false : true}
              >
                Post
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Posted!"
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Posted!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CreatePost
