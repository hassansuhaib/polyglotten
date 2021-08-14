import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({}))

const CreateAnswer = ({ questionId }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const [answer, setAnswer] = useState({
    question: questionId,
    content: '',
    user: user && user.pk,
  })
  console.log('Create Answer', answer)
  const submit = () => {
    api
      .post(urls.createAnswer, answer)
      .then((response) => console.log('Response: ', response))
      .catch((error) => console.log(error))
  }
  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        label="Answer"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        onChange={(event) => {
          setAnswer({
            ...answer,
            content: event.target.value,
          })
        }}
      />
      <Button variant="contained" color="primary" onClick={submit}>
        Post
      </Button>
    </div>
  )
}
export default CreateAnswer
