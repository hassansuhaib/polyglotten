import React, { useState, useEffect } from 'react'

import api from '../../api'
import * as urls from '../../constants'

import Answer from '../Answer/Answer'

const QuestionDetail = (props) => {
  const id = props.match.params.id
  const [state, setState] = useState({
    question: [],
    answers: [],
  })
  console.log('State: ', state)
  useEffect(() => {
    const getQuestionDetail = () => {
      api.get(urls.questionDetail(id)).then((response) =>
        setState({
          question: response.data.question,
          answers: response.data.answers,
        })
      )
    }
    getQuestionDetail()
  }, [])
  const renderAnswers = () => {
    return state.answers.map((answer) => (
      <Answer answer={answer} key={answer.id} />
    ))
  }
  return (
    <React.Fragment>
      <h3>{state.question.title}</h3>
      {renderAnswers()}
    </React.Fragment>
  )
}

export default QuestionDetail
