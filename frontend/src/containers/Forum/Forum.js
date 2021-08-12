import React, { useState, useEffect } from 'react'

import Question from '../../components/Question/Question'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import api from '../../api'
import * as urls from '../../constants'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  forum: {},
  toolbar: theme.mixins.toolbar,
}))

const Forum = () => {
  const classes = useStyles()
  const [state, setState] = useState({
    questions: [],
  })
  useEffect(() => {
    const getQuestions = () => {
      api
        .get(urls.questions)
        .then((response) => setState({ questions: response.data }))
    }
    getQuestions()
  }, [])

  const renderQuestions = () => {
    return state.questions.map((question) => (
      <Question question={question} key={question.id} />
    ))
  }

  return (
    <div className={classes.forum}>
      <div className={classes.toolbar} />
      <Container>
        <Typography variant="h3" component="h1">
          Q/A Forum
        </Typography>
      </Container>
    </div>
  )
}

export default Forum
