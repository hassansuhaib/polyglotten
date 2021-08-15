import React, { useState } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
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
            <Typography variant="h5" component="p">
              {comment.content}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.flex}>
              <Button variant="contained" onClick={handleLike}>
                Like
              </Button>
              <Typography>
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
