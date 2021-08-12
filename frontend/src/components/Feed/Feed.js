import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Post from './Post'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const Feed = () => {
  const classes = useStyles()
  return (
    <div>
      <Typography variant="h4" component="h4">
        Feed
      </Typography>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}
export default Feed
