import React, { useEffect, useState } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import Question from '../../components/Question/Question'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const QuestionList = () => {
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
    if (state.questions.length > 0) {
      return state.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          qLState={state}
          qLSetState={setState}
        />
      ))
    } else {
      return <Typography variant="body1">No Questions Found!</Typography>
    }
  }

  return <List>{renderQuestions()}</List>
}
export default QuestionList
