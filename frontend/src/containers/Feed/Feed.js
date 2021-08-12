import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Post from '../../components/Post/Post'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const Feed = () => {
  const classes = useStyles()
  return (
    <div>
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
