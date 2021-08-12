import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const Comment = () => {
  const classes = useStyles()
  return (
    <div>
      <Typography variant="h5" component="p">
        This is a comment!
      </Typography>
    </div>
  )
}
export default Comment
