import React, { useState } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { Grid, List } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import history from '../../history'

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
  paper: {
    padding: theme.spacing(1),
    position: 'absolute',
  },
}))

const Answer = ({ answer, qDState, qDSetState }) => {
  const { content, id, no_of_votes, user } = answer
  const [state, setState] = useState({
    answer: answer,
    options: false,
  })
  const classes = useStyles()
  console.log('Answer: ', answer)

  const deleteAnswer = () => {
    api
      .delete(urls.answerDelete(id))
      .then((response) => {
        qDSetState({
          ...qDState,
          answers: qDState.answers.filter((answer) => answer.id !== id),
        })
      })
      .catch((error) => console.log(error))
  }

  const editAnswer = () => {
    history.push(`/forum/answer/edit/${id}`)
  }

  const handleVote = () => {
    api
      .post(urls.vote('answer', answer.id))
      .then((response) => {
        const updated = answer
        updated.votes.push(user)
        updated.no_of_votes++
        setState({ ...state, answer: updated })
      })
      .catch((error) => console.log(error))
  }

  const handleUnVote = () => {
    api
      .post(urls.unvote('answer', answer.id))
      .then((response) => {
        const updated = answer
        updated.votes = updated.votes.filter((vote) => vote.pk !== user.pk)
        updated.no_of_votes--
        setState({ ...state, answer: updated })
      })
      .catch((error) => console.log(error))
  }

  const renderVoteButton = () => {
    if (answer) {
      if (answer.votes.length > 0) {
        const found = answer.votes.find((vote) => vote.pk === user.pk)
        if (found) {
          return (
            <Button variant="contained" color="primary" onClick={handleUnVote}>
              UnVote
            </Button>
          )
        }
      }
      return (
        <Button variant="contained" color="primary" onClick={handleVote}>
          Vote
        </Button>
      )
    }
  }

  return (
    <ListItem alignItems="flex-start">
      <Grid container>
        <Grid item xs={1}>
          {renderVoteButton()}
        </Grid>
        <Grid item xs={10}>
          <ListItemText
            primary={content}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                {` - Votes: ${no_of_votes}`}
              </React.Fragment>
            }
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton
            onClick={() => setState({ ...state, options: !state.options })}
          >
            <MoreHorizIcon />
          </IconButton>
          <Fade in={state.options}>
            <Paper className={classes.paper}>
              <List>
                <ListItem button onClick={editAnswer}>
                  <ListItemText primary="Edit" />
                </ListItem>
                <ListItem button onClick={deleteAnswer}>
                  <ListItemText primary="Delete" />
                </ListItem>
              </List>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Answer
