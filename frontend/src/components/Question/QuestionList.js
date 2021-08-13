import React, { useEffect, useState } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import Question from '../../components/Question/Question'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

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

  return (
    <List>
      <Question question={{ title: 'Hello', id: '1' }} />
      <Question question={{ title: 'Hello', id: '1' }} />
      <Question question={{ title: 'Hello', id: '1' }} />
      <Question question={{ title: 'Hello', id: '1' }} />
    </List>
  )
}
export default QuestionList
