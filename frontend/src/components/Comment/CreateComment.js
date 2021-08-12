import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const CreateComment = () => {
  const classes = useStyles()
  return (
    <div>
      <Typography variant="h5" component="p">
        Create a Comment!
      </Typography>
    </div>
  )
}
export default CreateComment
