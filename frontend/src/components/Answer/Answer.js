import React from 'react'
import api from '../../api'
import * as urls from '../../constants'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListItemIcon, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}))

const Answer = ({ answer, qDState, qDSetState }) => {
  const { content, id, no_of_votes, user } = answer
  const classes = useStyles()
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
  return (
    <ListItem alignItems="flex-start">
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
      <IconButton onClick={deleteAnswer}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}

export default Answer
