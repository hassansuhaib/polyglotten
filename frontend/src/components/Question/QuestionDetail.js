import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Divider, Grid, Typography } from '@material-ui/core'

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
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

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
            <IconButton color="secondary" onClick={handleUnVote}>
              <ArrowDownwardIcon />
            </IconButton>
          )
        }
      }
      return (
        <IconButton color="primary" onClick={handleVote}>
          <ArrowUpwardIcon />
        </IconButton>
      )
    }
  }

  const renderQuestion = () => {
    if (state.question) {
      return (
        <React.Fragment>
          <Grid container>
            <Grid item xs={1}>
              {renderVoteButton()} {state.question.no_of_votes}
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h4">{state.question.title}</Typography>
            </Grid>
            <Grid item xs={1}>
              <ClickAwayListener
                onClickAway={() => setState({ ...state, options: false })}
              >
                <IconButton
                  onClick={() =>
                    setState({ ...state, options: !state.options })
                  }
                >
                  <MoreHorizIcon />
                </IconButton>
              </ClickAwayListener>
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
            <Grid item xs={1}></Grid>
            <Grid item container xs={11} alignItems="center">
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
        <React.Fragment>
          <ListItem>
            <Answer
              answer={answer}
              key={answer.id}
              qDState={state}
              qDSetState={setState}
            />
          </ListItem>
          <Divider variant="middle" component="li" />
        </React.Fragment>
      ))
    } else {
      return (
        <ListItem>
          <Typography>No answers available.</Typography>
        </ListItem>
      )
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {renderQuestion()}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item container xs={11} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h6">
              {state && state.answers && state.answers.length} Answers
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <List disablePadding>{renderAnswers()}</List>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <CreateAnswer
            questionId={parseInt(id)}
            qDState={state}
            qDSetState={setState}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default QuestionDetail
