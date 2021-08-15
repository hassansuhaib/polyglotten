import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  createPost: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    '& > *': {
      maxHeight: '100px',
      maxWidth: '100px',
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const SharePost = ({ post, pState, pSetState }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const [state, setState] = useState({
    shared_content: '',
    post_id: post.id,
  })

  console.log('SharePost State: ', state)

  const handleSubmit = () => {
    api
      .post(urls.postShare, state)
      .then((response) => {
        const updated = pState.post
        updated.shared = true
        updated.sharing_user = user
        updated.shared_content = state.shared_content
        pSetState({
          ...pState,
          showShare: false,
          post: updated,
        })
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setState({})
      })
  }

  return (
    <div>
      <Paper elevation={2} className={classes.createPost}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.invite}>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={state.shared_content}
              onChange={(event) => {
                setState({
                  ...state,
                  shared_content: event.target.value,
                })
              }}
            />
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <div className={classes.flex}>
                <Typography>{`${post.user.first_name} ${post.user.last_name}`}</Typography>
                <Typography>{` ${new Date(post.created_at).toLocaleDateString(
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
              <Typography>{post.content}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Image</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.invite}>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Share
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SharePost
