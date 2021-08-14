import { List } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import api from '../../api'
import * as urls from '../../constants'

import Answer from '../Answer/Answer'
import CreateAnswer from '../Answer/CreateAnswer'

const QuestionDetail = ({ id }) => {
  const [state, setState] = useState({
    question: [],
    answers: [],
  })
  console.log('State: ', state)
  useEffect(() => {
    const getQuestionDetail = () => {
      api
        .get(urls.questionDetail(id))
        .then((response) =>
          // setState({
          //   question: response.data.question,
          //   answers: response.data.answers,
          // })
          console.log('Response: ', response.data)
        )
        .catch((error) => {
          console.log('Error: ', error)
        })
    }
    getQuestionDetail()
  }, [])

  const renderAnswers = () => {
    // return state.answers.map((answer) => (
    //   <Answer answer={answer} key={answer.id} />
    // ))
    for (let i = 0; i < 10; i++) {
      const answer = { content: 'Hello', id: 1 }
      return <Answer answer={answer} key={answer.id} />
    }
  }

  return (
    <React.Fragment>
      <h4>Question Detail</h4>
      <h3>{state.question.title}</h3>
      <List>{renderAnswers()}</List>
      <CreateAnswer />
    </React.Fragment>
  )
}

export default QuestionDetail
