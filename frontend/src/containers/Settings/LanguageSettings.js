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
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}))

const LanguageSettings = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    languages: '',
    new_language: '',
    classification: 'Native',
  })
  console.log('Languages state: ', state)
  useEffect(() => {
    api
      .get(urls.languages)
      .then((response) => setState({ ...state, languages: response.data }))
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
      .post(urls.languageUpdate('add'), state)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  const handleRemove = (title) => {
    api
      .post(urls.languageUpdate('remove'), {
        new_language: title,
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  const renderLanguages = () => {
    if (state.languages && state.languages.length > 1) {
      return state.languages.map((language) => (
        <ListItem>
          <ListItemText
            primary={language.language.title}
            secondary={language.classification}
          />

          <IconButton>
            <ClearIcon onClick={() => handleRemove(language.language.title)} />
          </IconButton>
        </ListItem>
      ))
    }
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5">Language Settings</Typography>
        </Grid>
        <Grid item xs={12}>
          <List>{renderLanguages()}</List>
        </Grid>
        <Grid item container spacing={3} xs={12}>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Add Language"
              variant="outlined"
              name="new_language"
              fullWidth
              value={state.new_language}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="select-language">Select Type</InputLabel>
              <Select
                labelId="select-language"
                id="language"
                name="classification"
                value={state.classification ? state.classification : 'Native'}
                onChange={handleChange}
              >
                <MenuItem value={'Native'}>Native</MenuItem>
                <MenuItem value={'Target'}>Target</MenuItem>
              </Select>
            </FormControl>
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
export default LanguageSettings
