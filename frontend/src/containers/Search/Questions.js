import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({}))

const Questions = ({ questions, done }) => {
  const classes = useStyles()
  const renderMessage = () => {
    if (done) {
      return <Typography>No results found</Typography>
    } else {
      return ''
    }
  }
  const renderQuestion = (question) => {
    return (
      <React.Fragment key={question.id}>
        <ListItem
          button
          component={RouterLink}
          to={`forum/question/${question.id}`}
          alignItems="flex-start"
        >
          <ListItemText
            primary={`${question.user.first_name} ${question.user.last_name}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {question.content}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    )
  }
  return (
    <div>
      <List>
        {questions && questions.length > 0
          ? questions.map((question) => renderQuestion(question))
          : renderMessage()}
      </List>
    </div>
  )
}
export default Questions
