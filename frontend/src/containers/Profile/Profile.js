import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Post from '../../components/Post/Post'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  profile: {
    textAlign: 'left',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  coverDiv: {
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '300px',
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
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    '&:hover': {
      '& .overlay': {
        display: 'block',
        background: 'rgba(0,0,0,.3)',
      },
    },
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
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: '0',
    right: 0,
    width: '100%',
    height: '100%',
  },
}))

const Profile = ({ username }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    edit: false,
    about: '',
  })
  const user = useSelector((state) => state.auth.user)
  console.log('Profile State: ', state)
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Profile'
    const getUserProfile = () => {
      let profileData = null
      let cover_photo = null
      let profile_photo = null
      api
        .get(urls.profile)
        .then((response) => {
          profileData = response.data
          if (profileData.cover_photo === null) {
            profileData.cover_photo =
              process.env.PUBLIC_URL + '/assets/covers/cover.jpg'
          }
          if (profileData.profile_photo === null) {
            profileData.profile_photo =
              process.env.PUBLIC_URL + '/assets/profile_photos/philip.jpg'
          }
          return api.get(urls.userPosts(username))
        })
        .then((response) =>
          setState({ ...state, ...profileData, posts: response.data })
        )
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

  const handleFollow = () => {
    console.log('Follow')
  }

  const handleUnfollow = () => {
    console.log('Unfollow')
  }

  const handleAbout = () => {
    api
      .patch(urls.profileUpdate(state.pk), {
        about: state.about,
      })
      .then((response) => {
        console.log(response.data)
        setState({
          ...state,
          edit: false,
        })
      })
  }

  const handleCover = () => {
    console.log('Cover')
  }

  const handlePhoto = () => {
    console.log('Photo')
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.coverDiv}>
          <div
            className={classes.coverPhoto}
            style={{ backgroundImage: `url(${state && state.cover_photo})` }}
          >
            <IconButton className={classes.overlay}></IconButton>
          </div>
        </div>
        <div className={classes.imagesDiv}>
          <div
            className={classes.profileDiv}
            style={{ backgroundImage: `url(${state && state.profile_photo})` }}
          >
            <IconButton className={classes.overlay}></IconButton>
          </div>
          {user && user.username == username ? (
            ''
          ) : (
            <Button variant="outlined" color="primary">
              Follow
            </Button>
          )}
        </div>
        <div className={classes.name}>
          <Typography variant="h6">
            {state && state.user && state.user.first_name}{' '}
            {state && state.user && state.user.last_name}
          </Typography>
          <div>
            {state.edit ? (
              <TextField
                id="outlined-multiline-static"
                label="About"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={state.about}
                onChange={(event) => {
                  setState({
                    ...state,
                    about: event.target.value,
                  })
                }}
              />
            ) : (
              <Typography variant="body2">
                {state && state.about ? state.about : 'Language Learner'}
              </Typography>
            )}
            {state.edit ? (
              <Button variant="contained" color="primary" onClick={handleAbout}>
                Done
              </Button>
            ) : (
              <IconButton onClick={() => setState({ ...state, edit: true })}>
                <EditIcon />
              </IconButton>
            )}
          </div>
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
