import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../../api'
import * as urls from '../../constants'
import Post from '../../components/Post/Post'
import CreatePost from '../../components/Post/CreatePost'
import ImageDialog from './ImageDialog'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Skeleton from '@material-ui/lab/Skeleton'

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
    backgroundSize: 'cover',
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
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  chips: {
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
  about: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Profile = ({ username }) => {
  const classes = useStyles()
  const [state, setState] = useState({
    edit: false,
    about: '',
    followed: false,
    loading: true,
  })
  const user = useSelector((state) => state.auth.user)

  console.log('Profile State: ', state)
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Profile'
    const getUserProfile = () => {
      let profileData = null
      let posts = null
      api
        .get(urls.profile(username))
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
        .then((response) => {
          posts = response.data
          return api.get(urls.checkFollow, {
            params: {
              user_id: profileData.user.pk,
            },
          })
        })
        .then((response) => {
          setState({
            ...state,
            ...profileData,
            posts: posts,
            followed: response.data.followed,
            loading: false,
          })
          console.log(response.data)
        })
        .catch((error) => console.log(error))
    }
    getUserProfile()
  }, [])

  const renderLanguages = () => {
    if (state && state.languages && state.languages.length > 0) {
      return (
        <div className={classes.chips}>
          {state.languages.map((language) => (
            <Chip key={language.id} label={language.title} color="primary" />
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
        <div className={classes.chips}>
          {state.interests.map((interest) => (
            <Chip key={interest.id} label={interest.title} color="primary" />
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

  const renderEditButton = () => {
    if (state.edit) {
      return (
        <Button variant="contained" color="primary" onClick={handleAbout}>
          Done
        </Button>
      )
    } else {
      return (
        <IconButton
          size="small"
          onClick={() => setState({ ...state, edit: true })}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )
    }
  }

  const renderFollow = () => {
    if (state.followed) {
      return (
        <Button variant="outlined" color="primary" onClick={handleUnfollow}>
          Unfollow
        </Button>
      )
    } else {
      return (
        <Button variant="outlined" color="primary" onClick={handleFollow}>
          Follow
        </Button>
      )
    }
  }

  const handleFollow = () => {
    api
      .post(urls.follow, {
        user_id: state.user.pk,
      })
      .then((response) => {
        setState({ ...state, followed: true })
        console.log(response.data)
      })
      .catch((error) => console.log(error))
  }

  const handleUnfollow = () => {
    api
      .post(urls.unfollow, {
        user_id: state.user.pk,
      })
      .then((response) => {
        setState({ ...state, followed: false })
        console.log(response.data)
      })
      .catch((error) => console.log(error))
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

  const renderHeader = () => {
    return (
      <React.Fragment>
        <div className={classes.coverDiv}>
          {state.loading ? (
            <Skeleton variant="rect" height={300} />
          ) : (
            <React.Fragment>
              <div
                className={classes.coverPhoto}
                style={{
                  backgroundImage: `url(${state && state.cover_photo})`,
                }}
              >
                <ImageDialog
                  title={'Change Cover Photo'}
                  pState={state}
                  pSetState={setState}
                  type="cover"
                />
              </div>
            </React.Fragment>
          )}
        </div>
        <div className={classes.imagesDiv}>
          {state.loading ? (
            <div className={classes.profileDiv}>
              <Skeleton
                animation="wave"
                variant="circle"
                height={150}
                width={150}
              />
            </div>
          ) : (
            <div
              className={classes.profileDiv}
              style={{
                backgroundImage: `url(${state && state.profile_photo})`,
              }}
            >
              <ImageDialog
                title={'Change Profile Photo'}
                pState={state}
                pSetState={setState}
                type="profile"
              />
            </div>
          )}
          {user && user.username == username ? '' : renderFollow()}
        </div>
        <div className={classes.name}>
          <Typography variant="h6">
            {state && state.user && state.user.first_name}{' '}
            {state && state.user && state.user.last_name}
          </Typography>
          <div className={classes.about}>
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
              <Typography variant="body1">
                {state && state.about ? state.about : 'Language Learner'}
              </Typography>
            )}
            {state.user && state.user.username === user.username
              ? renderEditButton()
              : ''}
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {renderHeader()}
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
        <CreatePost />
        {renderPosts()}
      </Grid>
    </Grid>
  )
}
export default Profile
