import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import Post from '../../components/Post/Post'
import CreatePost from '../../components/Post/CreatePost'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const Feed = () => {
  const classes = useStyles()
  const [state, setState] = useState({ posts: null })

  useEffect(() => {
    api
      .get(urls.posts)
      .then((response) => setState({ posts: response.data }))
      .catch((error) => console.log(error))
  }, [])

  const renderPosts = () => {
    return state.posts.map((post) => <Post key={post.id} post={post} />)
  }

  return (
    <div>
      <CreatePost />
      {renderPosts()}
    </div>
  )
}
export default Feed
