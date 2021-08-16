import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({}))

const CreateChat = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    loading: false,
    results: [],
    term: '',
  })

  console.log('Create Chat state: ', state)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'CreateChat'
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.term) {
        setState({ ...state, loading: true })
        api
          .get(urls.userSearch, {
            params: {
              search: state.term,
            },
          })
          .then((response) => {
            setState({ ...state, results: response.data, loading: false })
          })
          .catch((error) => {
            setState({ ...state, loading: false })
          })
      } else {
        setState({ ...state, results: [], loading: false })
      }
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [state.term])

  const handleCreate = (username) => {
    console.log('Chat created!')
    history.push(`/messages/${username}`)
  }

  const renderResults = () => {
    if (state.results.length > 0) {
      return state.results.map((user) => (
        <ListItem
          button
          onClick={() => handleCreate(user.username)}
          key={user.id}
        >
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
      ))
    }
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Search</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            name="term"
            value={state.term}
            onChange={(e) => setState({ ...state, term: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {state.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </React.Fragment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <List>{renderResults()}</List>
        </Grid>
      </Grid>
    </div>
  )
}
export default CreateChat
