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
  const { content, id, no_of_votes, user } = answer
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
              {`${user.first_name} ${user.last_name}`}
            </Typography>
            {` - Votes: ${no_of_votes}`}
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default Answer
