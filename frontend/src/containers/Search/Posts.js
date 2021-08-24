import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({}))

const Posts = ({ posts, done }) => {
  const classes = useStyles()
  const renderMessage = () => {
    if (done) {
      return <Typography>No results found</Typography>
    } else {
      return ''
    }
  }
  const renderPost = (post) => {
    return (
      <React.Fragment key={post.id}>
        <ListItem
          button
          component={RouterLink}
          to={`/post/${post.id}`}
          alignItems="flex-start"
        >
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={post.user_profile.profile_photo} />
          </ListItemAvatar>
          <ListItemText
            primary={`${post.user.first_name} ${post.user.last_name}`}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {post.content}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    )
  }
  return (
    <div>
      <List>
        {posts && posts.length > 0
          ? posts.map((post) => renderPost(post))
          : renderMessage()}
      </List>
    </div>
  )
}
export default Posts
