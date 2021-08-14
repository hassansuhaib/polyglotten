import { List, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'

import api from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import Answer from '../Answer/Answer'
import CreateAnswer from '../Answer/CreateAnswer'
import Button from '@material-ui/core/Button'

const QuestionDetail = ({ id }) => {
  const [state, setState] = useState({
    question: null,
    answers: null,
  })
  console.log('Question Detail State: ', state)
  useEffect(() => {
    const getQuestionDetail = () => {
      api
        .get(urls.questionDetail(id))
        .then((response) =>
          setState({
            question: response.data.question,
            answers: response.data.answers,
          })
        )
        .catch((error) => {
          console.log('Error: ', error)
        })
    }
    getQuestionDetail()
  }, [])

  const renderQuestion = () => {
    if (state.question) {
      return (
        <React.Fragment>
          <h3>{state.question.title}</h3>
          <Typography variant="body1">{state.question.content}</Typography>
        </React.Fragment>
      )
    } else {
      return <Typography>Loading..</Typography>
    }
  }

  const renderAnswers = () => {
    if (state.answers) {
      return state.answers.map((answer) => (
        <Answer
          answer={answer}
          key={answer.id}
          qDState={state}
          qDSetState={setState}
        />
      ))
    } else {
      return <Typography>No answers available.</Typography>
    }
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.goBack()}
      >
        Go Back
      </Button>
      {renderQuestion()}
      <List>{renderAnswers()}</List>
      <CreateAnswer
        questionId={parseInt(id)}
        qDState={state}
        qDSetState={setState}
      />
    </React.Fragment>
  )
}

export default QuestionDetail
