import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const CreateAnswer = ({ questionId, qDState, qDSetState }) => {
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
      .post(urls.answerCreate, answer)
      .then((response) => {
        qDSetState({
          ...qDSetState,
          answers: qDState.answers.concat(response.data),
        })
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setAnswer({
          ...answer,
          content: '',
        })
      })
  }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Answer"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={answer.content}
            onChange={(event) => {
              setAnswer({
                ...answer,
                content: event.target.value,
              })
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={submit}>
            Post
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
export default CreateAnswer
