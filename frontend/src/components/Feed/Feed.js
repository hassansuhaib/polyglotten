import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Post from './Post'

const useStyles = makeStyles((theme) => ({}))

const Feed = () => {
  const classes = useStyles()
  return (
    <div>
      <Post />
    </div>
  )
}
export default Feed
