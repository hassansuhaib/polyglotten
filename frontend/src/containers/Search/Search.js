import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import Questions from './Questions'
import People from './People'
import Posts from './Posts'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}))

const Search = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    loading: false,
    term: '',
    value: 0,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Search'
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.term) {
        api
          .get(urls.search, {
            params: {
              term: state.term,
            },
          })
          .then((response) => {
            console.log(response.data)
            setState({
              ...state,
              results: response.data,
              loading: false,
            })
          })
      } else {
        setState({
          ...state,
          loading: false,
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
      term: event.target.value,
      loading: true,
    })
  }

  const handleTabChange = (event, newValue) => {
    setState({
      ...state,
      value: newValue,
    })
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    )
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
            value={state.term}
            onChange={handleChange}
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
          <AppBar position="static">
            <Tabs
              value={state.value}
              onChange={handleTabChange}
              aria-label="search result tabs"
              variant="fullWidth"
            >
              <Tab label="People" />
              <Tab label="Posts" />
              <Tab label="Questions" />
            </Tabs>
          </AppBar>
          <TabPanel value={state.value} index={0}>
            <People
              people={state.results && state.results.people}
              done={state.results && state.results.people ? true : false}
            />
          </TabPanel>
          <TabPanel value={state.value} index={1}>
            <Posts
              posts={state.results && state.results.posts}
              done={state.results && state.results.posts ? true : false}
            />
          </TabPanel>
          <TabPanel value={state.value} index={2}>
            <Questions
              questions={state.results && state.results.questions}
              done={state.results && state.results.questions ? true : false}
            />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  )
}
export default Search
