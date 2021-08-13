import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}))
const Answer = ({ answer }) => {
  const { content, id } = answer
  const classes = useStyles()
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
              Sandra Adams
            </Typography>
            {' — Do you have Paris recommendations? Have you ever…'}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default Answer
