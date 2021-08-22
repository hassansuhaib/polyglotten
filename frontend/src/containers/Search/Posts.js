import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const Posts = ({ posts }) => {
  const classes = useStyles()
  return (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.content}</p>
      ))}
    </div>
  )
}
export default Posts
