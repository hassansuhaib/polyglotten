import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'

import api from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import Answer from '../Answer/Answer'
import CreateAnswer from '../Answer/CreateAnswer'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  inline: {
    display: 'inline',
  },
  paper: {
    padding: theme.spacing(1),
    position: 'absolute',
    zIndex: '20',
  },
}))

const QuestionDetail = ({ id }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    question: null,
    answers: null,
    options: false,
  })
  const user = useSelector((state) => state.auth.user)
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

  const deleteQuestion = () => {
    api
      .delete(urls.questionDelete(state.question.id))
      .then((response) => {
        history.push('/forum')
      })
      .catch((error) => console.log(error))
  }

  const editQuestion = () => {
    history.push(`/forum/question/edit/${id}`)
  }

  const handleVote = () => {
    api
      .post(urls.vote('question', state.question.id))
      .then((response) => {
        const updated = state.question
        updated.votes.push(user)
        updated.no_of_votes++
        setState({ ...state, question: updated })
      })
      .catch((error) => console.log(error))
  }

  const handleUnVote = () => {
    api
      .post(urls.unvote('question', state.question.id))
      .then((response) => {
        const updated = state.question
        updated.votes = updated.votes.filter((vote) => vote.pk !== user.pk)
        updated.no_of_votes--
        setState({ ...state, question: updated })
      })
      .catch((error) => console.log(error))
  }

  const renderVoteButton = () => {
    if (state.question) {
      if (state.question.votes.length > 0) {
        const found = state.question.votes.find((vote) => vote.pk === user.pk)
        if (found) {
          return (
            <Button color="secondary" onClick={handleUnVote}>
              <ArrowDownwardIcon />
            </Button>
          )
        }
      }
      return (
        <Button color="primary" onClick={handleVote}>
          <ArrowUpwardIcon />
        </Button>
      )
    }
  }

  const renderQuestion = () => {
    if (state.question) {
      return (
        <React.Fragment>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h4">{state.question.title}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={() => setState({ ...state, options: !state.options })}
              >
                <MoreHorizIcon />
              </IconButton>
              <Fade in={state.options}>
                <Paper className={classes.paper}>
                  <List>
                    <ListItem button onClick={editQuestion}>
                      <ListItemText primary="Edit" />
                    </ListItem>
                    <ListItem button onClick={deleteQuestion}>
                      <ListItemText primary="Delete" />
                    </ListItem>
                  </List>
                </Paper>
              </Fade>
            </Grid>
            <Grid item container direction="row" alignItems="center" xs={2}>
              {renderVoteButton()}{' '}
              <Typography>
                {' '}
                {' - '} {state.question.no_of_votes} vote/s
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{state.question.content}</Typography>
            </Grid>
          </Grid>
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
