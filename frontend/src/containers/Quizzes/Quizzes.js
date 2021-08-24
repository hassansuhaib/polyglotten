import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import history from '../../history'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Start from './Start'
import VocabularyQuiz from './VocabularyQuiz'
import TranslationQuiz from './TranslationQuiz'
import Result from './Result'
import { Button, IconButton, Typography } from '@material-ui/core'
import { quiz } from '../../constants'
import Paper from '@material-ui/core/Paper'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
}))

const Quizzes = (props) => {
  const classes = useStyles()
  const view = props.match.params.view
  const [state, setState] = useState({
    quiz: null,
    quiz_id: null,
    vocabulary_answers: null,
    translation_answers: null,
  })

  console.log('Quizzes state: ', state)
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Assessment Test'
  }, [])

  const renderView = () => {
    switch (view) {
      case 'vocabulary':
        if (state.quiz) {
          return (
            <VocabularyQuiz
              questions={state.quiz && state.quiz.mcqs}
              qState={state}
              qSetState={setState}
            />
          )
        } else {
          return <Typography>You aren't taking any test.</Typography>
        }
      case 'translation':
        if (state.quiz) {
          return (
            <TranslationQuiz
              translations={state.quiz && state.quiz.translations}
              qState={state}
              qSetState={setState}
            />
          )
        } else {
          return <Typography>You aren't taking any test.</Typography>
        }
      case 'result':
        return <Result qState={state} qSetState={setState} />
      default:
        return <Start qState={state} qSetState={setState} />
    }
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Container>
        <Paper className={classes.root} elevation={3}>
          <IconButton color="primary" onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>
          {renderView()}
        </Paper>
      </Container>
    </div>
  )
}
export default Quizzes
