import React, { useState } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const Comment = ({ comment }) => {
  const classes = useStyles()
  const name = `${comment.user.first_name} ${comment.user.last_name}`
  const [state, setState] = useState({
    comment: comment,
  })
  console.log('Comment state: ', comment)
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
          <Button variant="contained" onClick={handleLike}>
            Like
          </Button>
          <Typography>
            {state.comment.no_of_likes === 1
              ? `${state.comment.no_of_likes} like`
              : `${state.comment.no_of_likes} likes`}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}
export default Comment
