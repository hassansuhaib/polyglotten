import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'
import Post from './Post'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({}))

const PostDetail = ({ postID }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    loading: true,
    post: null,
  })
  useEffect(() => {
    const getPost = () => {
      api
        .get(urls.postDetail(postID))
        .then((response) =>
          setState({
            post: response.data,
            loading: false,
          })
        )
        .catch((error) => console.log(error))
    }
    getPost()
  })
  return (
    <div>
      {state.post ? (
        <Post post={state.post} />
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  )
}
export default PostDetail
