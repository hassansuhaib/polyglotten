import React, { useState } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBotom: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'left',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

const Comment = ({ comment }) => {
  const classes = useStyles()
  const name = `${comment.user.first_name} ${comment.user.last_name}`
  const [state, setState] = useState({
    comment: comment,
  })
  const handleLike = () => {
    api
      .post(urls.like('comment', comment.id))
      .then((response) => {
        const updated = comment
        updated.no_of_likes++
        setState({ ...state, comment: updated })
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <Paper className={classes.root} elevation={2}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography>{name}</Typography>
              <Typography>{` ${new Date(comment.created_at).toLocaleDateString(
                'en-US',
                {
                  day: 'numeric',
                  month: 'short',
                  // year: 'numeric',
                  // hour: 'numeric',
                  // minute: 'numeric',
                }
              )}`}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.padding}>
              <Typography variant="body1" component="p">
                {comment.content}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.flex}>
              <Button size="small" color="primary" onClick={handleLike}>
                <ThumbUpIcon fontSize="small" />
                &nbsp; Like
              </Button>
              <Typography variant="caption">
                {state.comment.no_of_likes === 1
                  ? `${state.comment.no_of_likes} like`
                  : `${state.comment.no_of_likes} likes`}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default Comment
