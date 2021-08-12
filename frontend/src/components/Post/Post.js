import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  post: {
    width: '100%',
    height: '500px',
    backgroundColor: 'purple',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
}))
const Post = () => {
  const classes = useStyles()
  return (
    <div className={classes.post}>
      <p>Hello World!</p>
    </div>
  )
}
export default Post
