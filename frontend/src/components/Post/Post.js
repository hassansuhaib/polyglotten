import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import CreateComment from '../Comment/CreateComment'
import Comment from '../Comment/Comment'
import SharePost from './SharePost'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import CommentIcon from '@material-ui/icons/Comment'
import ShareIcon from '@material-ui/icons/Share'

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
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  uncomment: {
    display: 'none',
  },
  share: {
    display: 'flex',
  },
  hideShare: {
    display: 'none',
  },
  body: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  postImage: {
    maxWidth: '100%',
  },
  text: {
    textAlign: 'left',
  },
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  hr: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))
const Post = ({ post }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const name = `${post.user.first_name} ${post.user.last_name}`
  const [state, setState] = useState({
    post: post,
    showForm: false,
    showShare: false,
    dialog: false,
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
        const found = state.post.likes.find((like) => like.pk === user.pk)
        if (found) {
          return (
            <Button size="small" color="primary" onClick={handleUnLike}>
              <ThumbDownIcon fontSize="small" />
              &nbsp; UnLike
            </Button>
          )
        }
      }
      return (
        <Button size="small" color="primary" onClick={handleLike}>
          <ThumbUpIcon fontSize="small" />
          &nbsp; Like
        </Button>
      )
    }
  }

  const renderImages = () => {
    return state.post.images.map((image) => {
      return (
        <img key={image.id} src={image.image} className={classes.postImage} />
      )
    })
  }

  const renderBody = () => {
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <div className={classes.header}>
            <Avatar src={post.user_profile.profile_photo} />
            <Typography variant="h5">{name}</Typography>
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
        <Grid item container xs={12}>
          <Grid item className={classes.text} xs={12}>
            <div className={classes.padding}>
              <Typography>{post.content}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            {renderImages()}
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }

  const renderMain = () => {
    if (post.shared === true) {
      return (
        <Grid item container>
          <Grid item xs={12}>
            <div className={classes.info}>
              <Typography variant="h5">{`${post.sharing_user.first_name} ${post.sharing_user.last_name}`}</Typography>
              <Typography>{` ${new Date(post.shared_at).toLocaleDateString(
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
            <div style={{ textAlign: 'left' }}>
              <Typography>{post.shared_content}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} className={classes.body}>
              {renderBody()}
            </Paper>
          </Grid>
        </Grid>
      )
    } else {
      return renderBody()
    }
  }

  return (
    <div>
      <Paper className={classes.post} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <div
              className={state.showShare ? classes.share : classes.hideShare}
            >
              <SharePost
                open={state.dialog}
                post={post}
                pState={state}
                pSetState={setState}
              />
            </div>
          </Grid>
          {renderMain()}
          <Grid item xs={12}>
            <div className={classes.hr}>
              <hr />
            </div>
            <div className={classes.info}>
              <Typography variant="caption">
                {state.post.no_of_likes === 1
                  ? `${state.post.no_of_likes} like`
                  : `${state.post.no_of_likes} likes`}
              </Typography>
              <Typography variant="caption">
                {state.post.no_of_comments === 1
                  ? `${state.post.no_of_comments} comment`
                  : `${state.post.no_of_comments} comments`}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              {renderLikeButton()}
              <Button
                size="small"
                onClick={() =>
                  setState({ ...state, showForm: !state.showForm })
                }
              >
                <CommentIcon fontSize="small" />
                &nbsp; Comment
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={() => setState({ ...state, dialog: true })}
              >
                <ShareIcon fontSize="small" />
                &nbsp; Share
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
