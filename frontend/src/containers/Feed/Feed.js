import React from 'react'

import Post from '../../components/Post/Post'
import CreatePost from '../../components/Post/CreatePost'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const Feed = () => {
  const classes = useStyles()
  return (
    <div>
      <CreatePost />
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
