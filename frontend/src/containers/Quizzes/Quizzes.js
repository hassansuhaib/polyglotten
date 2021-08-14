import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Start from './Start'
import VocabularyQuiz from './VocabularyQuiz'
import TranslationQuiz from './TranslationQuiz'
import Result from './Result'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({ toolbar: theme.mixins.toolbar }))

const Quizzes = (props) => {
  const classes = useStyles()
  const view = props.match.params.view

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Settings'
  }, [])

  const renderView = () => {
    switch (view) {
      case 'vocabulary':
        return <VocabularyQuiz />
      case 'translation':
        return <TranslationQuiz />
      case 'result':
        return <Result />
      default:
        return <Start />
    }
  }

  return (
    <div>
      <div className={classes.toolbar} />
      <Container>
        <Button
          variant="contained"
          color="secondary"
          component={RouterLink}
          to="/"
        >
          Home
        </Button>
        {renderView()}
      </Container>
    </div>
  )
}
export default Quizzes
