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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles((theme) => ({
  createPost: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  postImage: {
    maxWidth: '500px',
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const SharePost = ({ post, pState, pSetState, open }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const [state, setState] = useState({
    shared_content: '',
    post_id: post.id,
  })

  console.log('SharePost State: ', state)

  const handleClose = () => {
    pSetState({ ...pState, dialog: false })
  }

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
          dialog: false,
        })
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setState({})
      })
  }
  const renderImages = () => {
    return post.images.map((image) => {
      return (
        <img key={image.id} src={image.image} className={classes.postImage} />
      )
    })
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{'Share Post'}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} className={classes.invite}>
            <TextField
              id="outlined-multiline-static"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={state.shared_content}
              placeholder="Write something"
              onChange={(event) => {
                setState({
                  ...state,
                  shared_content: event.target.value,
                })
              }}
            />
          </Grid>
        </Grid>
        <Paper elevation={2} className={classes.createPost}>
          <Grid container spacing={3}>
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <div className={classes.flex}>
                  <Typography variant="h5">{`${post.user.first_name} ${post.user.last_name}`}</Typography>
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
                {renderImages()}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Share
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export default SharePost
