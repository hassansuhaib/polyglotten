import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'

import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  inline: {
    display: 'inline',
  },
}))

const Question = ({ question, qLState, qLSetState }) => {
  const { id, title, content, no_of_votes, user } = question
  console.log('Question: ', question)
  const classes = useStyles()
  const deleteQuestion = () => {
    api
      .delete(urls.questionDelete(id))
      .then((response) => {
        qLSetState({
          ...qLState,
          questions: qLState.questions.filter((question) => question.id !== id),
        })
      })
      .catch((error) => console.log(error))
  }
  return (
    <React.Fragment>
      <ListItem
        button
        component={RouterLink}
        to={`/forum/question/${id}`}
        alignItems="flex-start"
      >
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${user.first_name} ${user.last_name} - Votes: ${no_of_votes}`}
              </Typography>
              {` — ${content}`}
            </React.Fragment>
          }
        />
      </ListItem>

      <IconButton onClick={deleteQuestion}>
        <DeleteIcon />
      </IconButton>
    </React.Fragment>
  )
}

export default Question
