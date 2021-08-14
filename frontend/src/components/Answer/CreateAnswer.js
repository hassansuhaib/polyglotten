import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({}))

const CreateAnswer = (props) => {
  const classes = useStyles()
  return (
    <div>
      <TextField
        id="outlined-multiline-static"
        label="Answer"
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
      <Button variant="contained" color="primary">
        Post
      </Button>
    </div>
  )
}
export default CreateAnswer
