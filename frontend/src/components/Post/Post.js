import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import CreateComment from '../Comment/CreateComment'
import Comment from '../Comment/Comment'

const useStyles = makeStyles((theme) => ({
  post: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  comment: {
    display: 'flex',
  },
  uncomment: {
    display: 'none',
  },
}))
const Post = ({ post }) => {
  const classes = useStyles()
  const name = `${post.user.first_name} ${post.user.last_name}`
  const user = useSelector((state) => state.auth.user)
  const [state, setState] = useState({
    post: post,
    showForm: false,
  })

  console.log('Post State: ', state)

  const handleLike = () => {
    api
      .post(urls.like('post', post.id))
      .then((response) => {
        const updated = post
        updated.likes.push(user)
        updated.no_of_likes++
        setState({ ...state, post: updated })
      })
      .catch((error) => console.log(error))
  }

  const handleUnLike = () => {
    api
      .post(urls.unlike('post', post.id))
      .then((response) => {
        const updated = post
        updated.likes = updated.likes.filter((like) => like.pk !== user.pk)
        updated.no_of_likes--
        setState({ ...state, post: updated })
      })
      .catch((error) => console.log(error))
  }

  const renderComments = () => {
    if (state.post) {
      return state.post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))
    } else {
      return <Typography>No Comments yet</Typography>
    }
  }

  const renderLikeButton = () => {
    if (state.post) {
      if (state.post.likes.length > 0) {
        console.log('We here')
        const found = state.post.likes.find((like) => like.pk === user.pk)
        if (found) {
          console.log('Found')
          return (
            <Button variant="contained" color="primary" onClick={handleUnLike}>
              UnLike
            </Button>
          )
        }
      }
      return (
        <Button variant="contained" color="primary" onClick={handleLike}>
          Like
        </Button>
      )
    }
  }

  return (
    <div>
      <Paper className={classes.post} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography>{name}</Typography>
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
            <div>
              <Typography>{post.content}</Typography>
              <div>Image</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.info}>
              <Typography>
                {state.post.no_of_likes === 1
                  ? `${state.post.no_of_likes} like`
                  : `${state.post.no_of_likes} likes`}
              </Typography>
              <Typography>
                {state.post.no_of_comments === 1
                  ? `${state.post.no_of_comments} comment`
                  : `${state.post.no_of_comments} comments`}
              </Typography>
            </div>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              {renderLikeButton()}
              <Button
                variant="contained"
                onClick={() =>
                  setState({ ...state, showForm: !state.showForm })
                }
              >
                Comment
              </Button>
              <Button variant="contained" color="secondary">
                Share
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
              className={state.showForm ? classes.comment : classes.uncomment}
            >
              <CreateComment post={post} pState={state} pSetState={setState} />
            </div>
          </Grid>
          <Grid item xs={12}>
            {renderComments()}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default Post
