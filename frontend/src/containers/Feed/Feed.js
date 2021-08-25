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
  const [state, setState] = useState({ posts: null, recommendedPosts: null })
  console.log('Feed state: ', state)
  useEffect(() => {
    let posts = []
    api
      .get(urls.posts)
      .then((response) => {
        posts = response.data
        return api.get(urls.recommendedPosts)
      })
      .then((response) => {
        setState({ posts: posts, recommendedPosts: response.data })
      })
      .catch((error) => console.log(error))
  }, [])

  const renderPosts = () => {
    if (state.posts) {
      return state.posts.map((post_list) => {
        return post_list.map((post) => {
          console.log('Post: ', post)
          return <Post key={post.id} post={post} />
        })
      })
    } else {
      return <Typography>No posts to show.</Typography>
    }
  }

  const renderRecommended = () => {
    if (state.recommendedPosts) {
      return state.recommendedPosts.map((post_list) => {
        return post_list.map((post) => {
          return <Post key={post.id} post={post} />
        })
      })
    }
  }

  return (
    <div>
      <CreatePost fState={state} fSetState={setState} />
      {renderPosts()}
      {renderRecommended()}
    </div>
  )
}
export default Feed
