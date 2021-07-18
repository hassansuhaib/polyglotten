import React, { useState, useEffect } from 'react'

import Question from '../../components/Question/Question'
import Container from '@material-ui/core/Container'

import api from '../../api'
import * as urls from '../../constants'

const Forum = () => {
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
    <Container>
      <h1>Forum</h1>
      {renderQuestions()}
    </Container>
  )
}

export default Forum
