import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {
  Grid,
  IconButton,
  ListItemIcon,
  Typography,
  Button,
} from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}))

const InterestSettings = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    interests: '',
    interest: '',
  })

  console.log('Interest state: ', state)

  useEffect(() => {
    api
      .get(urls.interests)
      .then((response) => setState({ interests: response.data }))
      .catch((error) => console.log(error))
  }, [])

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handleAdd = () => {
    api
      .post(urls.interestUpdate('add'), state)
      .then((response) => {
        let interests = state.interests
        interests.push(response.data)
        console.log(interests)
        setState({ interests: interests, interest: '' })
      })
      .catch((error) => console.log(error))
  }

  const handleRemove = (title) => {
    api
      .post(urls.interestUpdate('remove'), {
        interest: title,
      })
      .then((response) => {
        const filtered_interests = state.interests.filter(
          (interest) => interest.title != response.data.title
        )
        setState({ ...state, interests: filtered_interests })
      })
      .catch((error) => console.log(error))
  }

  const renderInterests = () => {
    if (state.interests && state.interests.length > 0) {
      return state.interests.map((interest) => (
        <ListItem key={interest.id}>
          <ListItemText primary={interest.title} />
          <IconButton onClick={() => handleRemove(interest.title)}>
            <ClearIcon />
          </IconButton>
        </ListItem>
      ))
    }
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Interest Settings</Typography>
        </Grid>
        <Grid item xs={12}>
          <List>{renderInterests()}</List>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Add Interest"
              variant="outlined"
              name="interest"
              fullWidth
              value={state.interest}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleAdd}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
export default InterestSettings
