import React, { useState } from 'react'

import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import SendIcon from '@material-ui/icons/Send'
import { IconButton } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({}))

const CreateComment = ({ post, pState, pSetState }) => {
  const classes = useStyles()
  const [comment, setComment] = useState('')
  const user = useSelector((state) => state.auth.user)
  const handleSubmit = () => {
    api
      .post(urls.commentCreate, {
        content: comment,
        post: post.id,
        user: user.pk,
      })
      .then((response) => {
        const updated = post
        updated.no_of_comments++
        updated.comments.push(response.data)
        pSetState({ ...pState, showForm: false, post: updated })
      })
      .catch((error) => console.log(error))
  }
  return (
    <React.Fragment>
      <TextField
        id="outlined-multiline-static"
        fullWidth
        multiline
        variant="outlined"
        placeholder="Comment"
        value={comment}
        onChange={(event) => {
          setComment(event.target.value)
        }}
      />
      <IconButton color="primary" onClick={handleSubmit}>
        <SendIcon />
      </IconButton>
    </React.Fragment>
  )
}
export default CreateComment
