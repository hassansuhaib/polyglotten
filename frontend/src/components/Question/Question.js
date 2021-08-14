import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  inline: {
    display: 'inline',
  },
}))

const Question = ({ question }) => {
  const { id, title, content, no_of_votes, user } = question
  console.log('Question: ', question)
  const classes = useStyles()
  return (
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
  )
}

export default Question
