import React, { useState, useEffect } from 'react'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Post from '../../components/Post/Post'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  profile: {
    textAlign: 'left',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  coverPhoto: {
    width: '100%',
    height: '300px',
    backgroundImage: `url(${
      process.env.PUBLIC_URL + '/assets/covers/cover.jpg'
    })`,
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
  },
  imagesDiv: {
    position: 'relative',
    height: '4rem',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  profileDiv: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    bottom: '0',
    left: '38%',
    borderRadius: '50%' /*don't forget prefixes*/,
    backgroundImage: `url(${
      process.env.PUBLIC_URL + '/assets/profile_photos/philip.jpg'
    })`,
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
  },
  language: {
    border: '1px solid green',
    borderRadius: '10px',
    minWidth: '100px',
    padding: theme.spacing(1),
  },
  languages: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& > *': {
      margin: '10px',
    },
  },
}))

const Profile = ({ username }) => {
  const classes = useStyles()
  const [state, setState] = useState(null)
  console.log('Profile State: ', state)
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Profile'
    const getUserProfile = () => {
      api
        .get(urls.profile)
        .then((response) => {
          setState(response.data)
          return api.get(urls.userPosts(username))
        })
        .then((response) => setState({ ...state, posts: response.data }))
        .catch((error) => console.log(error))
    }
    getUserProfile()
  }, [])

  const renderLanguages = () => {
    if (state && state.languages && state.languages.length > 0) {
      return (
        <div className={classes.languages}>
          {state.languages.map((language) => (
            <div key={language.id} className={classes.language}>
              <Typography variant="subtitle2">German</Typography>
            </div>
          ))}
        </div>
      )
    } else {
      return <Typography>No languages added yet.</Typography>
    }
  }

  const renderInterests = () => {
    if (state && state.interests && state.interests.length > 0) {
      return (
        <div className={classes.languages}>
          {state.interests.map((interest) => (
            <div key={interest.id} className={classes.language}>
              <Typography variant="subtitle2">German</Typography>
            </div>
          ))}
        </div>
      )
    } else {
      return <Typography>No interests added yet.</Typography>
    }
  }

  const renderPosts = () => {
    if (state && state.posts && state.posts.length > 0) {
      return state.posts.map((post) => <Post key={post.id} post={post} />)
    } else {
      return <Typography>No posts yet.</Typography>
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.coverPhoto}></div>
        <div className={classes.imagesDiv}>
          <div className={classes.profileDiv}></div>
          <Button variant="outlined" color="primary">
            Edit Profile
          </Button>
        </div>
        <div className={classes.name}>
          <Typography variant="h6">Hassan Suhaib</Typography>
          <Typography variant="body2">
            In love with the languages of the world | Learning: ES AR | Speak:
            UR AR ES EN | FullStack Web Developer
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Languages</Typography>
        {renderLanguages()}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Interests</Typography>
        {renderInterests()}
      </Grid>
      <Grid item xs={12}>
        {renderPosts()}
      </Grid>
    </Grid>
  )
}
export default Profile
