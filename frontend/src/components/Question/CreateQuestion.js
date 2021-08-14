import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  invite: {
    minWidth: 300,
  },
}))

const CreateQuestion = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    tags: [],
    question: {
      title: '',
      content: '',
      tags: [],
    },
  })

  console.log('Create Question State: ', state)

  const submit = () => {
    api
      .post(urls.createQuestion, state.question)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    const getTags = () => {
      api
        .get(urls.tags)
        .then((response) => setState({ ...state, tags: response.data }))
        .catch((error) => console.log('Error: ', error))
    }
    getTags()
  }, [])

  return (
    <div>
      <Box boxShadow={3} p={5}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography variant="h3">Ask a Question</Typography>
          </Grid>
          <Grid item xs={12} className={classes.invite}>
            <TextField
              id="outlined-multiline-static"
              label="Title"
              fullWidth
              variant="outlined"
              onChange={(event) => {
                setState({
                  ...state,
                  question: {
                    ...state.question,
                    title: event.target.value,
                  },
                })
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.invite}>
            <TextField
              id="outlined-multiline-static"
              label="Question"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              onChange={(event) => {
                setState({
                  ...state,
                  question: {
                    ...state.question,
                    content: event.target.value,
                  },
                })
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.invite}>
            <Autocomplete
              multiple
              id="tags-filled"
              options={state.tags.map((option) => option.title)}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              onChange={(event, value) => {
                setState({
                  ...state,
                  question: {
                    ...state.question,
                    tags: value,
                  },
                })
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags"
                  placeholder="Spanish"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={submit}>
              Post
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default CreateQuestion
