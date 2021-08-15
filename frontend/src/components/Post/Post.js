import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  post: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
const Post = ({ post }) => {
  const classes = useStyles()
  const name = `${post.user.first_name} ${post.user.last_name}`
  return (
    <div>
      <Paper className={classes.post} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography>{name}</Typography>
              <Typography>{` ${new Date(post.created_at).toLocaleDateString(
                'en-US',
                {
                  day: 'numeric',
                  month: 'short',
                  // year: 'numeric',
                  // hour: 'numeric',
                  // minute: 'numeric',
                }
              )}`}</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Typography>{post.content}</Typography>
              <div>Image</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button variant="contained" color="primary">
                Like
              </Button>
              <Button variant="contained">Comment</Button>
              <Button variant="contained" color="secondary">
                Share
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default Post
