import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { List, ListItem, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const ResultList = (props) => {
  const classes = useStyles()
  const [results, setResults] = useState(null)
  useEffect(() => {
    api
      .get(urls.quizResults)
      .then((response) => setResults(response.data))
      .catch((error) => console.log(error))
  }, [])

  const renderResults = () => {
    if (results) {
      return results.map((result) => (
        <React.Fragment>
          <ListItem>
            <Typography>Language: {result.language}</Typography>
          </ListItem>
          <ListItem>
            <Typography>Level: {result.level}</Typography>
          </ListItem>
          <ListItem>
            <Typography>
              Passed: {result.status ? 'Passed' : 'Failed'}
            </Typography>
          </ListItem>
        </React.Fragment>
      ))
    } else {
      return (
        <ListItem>
          <Typography>No tests taken yet.</Typography>
        </ListItem>
      )
    }
  }

  return (
    <Paper elevation={3}>
      <Typography variant="h5">Previous Results</Typography>
      <List>{renderResults()}</List>
    </Paper>
  )
}
export default ResultList
