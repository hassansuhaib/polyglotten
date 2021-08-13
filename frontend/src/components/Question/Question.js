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
  const { title, id } = question
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
              Sandra Adams
            </Typography>
            {' — Do you have Paris recommendations? Have you ever…'}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default Question
