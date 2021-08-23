import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'
import { v1 as uuid } from 'uuid'

import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import history from '../../history'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  invite: {
    minWidth: 300,
  },
  root: {
    padding: theme.spacing(2),
  },
}))

const CreateChannel = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    language: '',
    topic: '',
    users: [],
    term: '',
  })
  console.log('Create Channel State', state)
  const [friends, setFriends] = useState([])
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    api
      .get(urls.following)
      .then((response) => setFriends(response.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.term) {
        api
          .get(urls.userSearch, {
            params: {
              search: state.term,
            },
          })
          .then((response) => {
            console.log(response.data)
            const friends = response.data.filter(
              (friend) => friend.pk !== user.pk
            )
            setFriends(friends)
          })
      }
    }, 500)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [state.term])

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleUserChange = (event, value) => {
    setState({ ...state, users: value })
  }

  const create = () => {
    const id = uuid()
    api
      .post(urls.channelsCreate, { ...state, room_id: id })
      .then((response) => {
        setState({ ...state, ...response.data })
        history.push(`/channels/active/${id}`)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <Paper elevation={3} className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Create Channel</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-language">Select Language</InputLabel>
              <Select
                labelId="select-language"
                id="language-select"
                value={state.language}
                name="language"
                onChange={handleChange}
              >
                <MenuItem value={'Spanish'}>Spanish</MenuItem>
                <MenuItem value={'English'}>English</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Topic"
              fullWidth
              multiline
              rows={4}
              name="topic"
              value={state.topic}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              fullWidth
              id="tags-outlined"
              options={friends}
              getOptionLabel={(option) => option.username}
              filterSelectedOptions
              name="users"
              onChange={handleUserChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Invite People"
                  placeholder="People"
                  name="term"
                  value={state.term}
                  onChange={handleChange}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={create}>
              Let's Start!
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default CreateChannel
