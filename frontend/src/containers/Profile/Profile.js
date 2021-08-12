import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Feed from '../Feed/Feed'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  profile: {
    textAlign: 'left',
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
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  profileDiv: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    bottom: '0',
    left: '1rem',
    borderRadius: '50%' /*don't forget prefixes*/,
    backgroundImage: `url(${
      process.env.PUBLIC_URL + '/assets/profile_photos/philip.jpg'
    })`,
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
  },
  name: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
}))

const Profile = () => {
  const classes = useStyles()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Profile'
  }, [])
  return (
    <Grid container className={classes.profile}>
      <Grid item xs={12}>
        <div className={classes.coverPhoto}></div>
        <div className={classes.imagesDiv}>
          <div className={classes.profileDiv}></div>
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </div>
        <div className={classes.name}>
          <Typography variant="h6">Hassan Suhaib</Typography>
          <Typography variant="body2">
            In love with the languages of the world | Learning: Flag of
            SpainFlag of Saudi Arabia | Speak: Flag of Pakistan🇺🇲 | FullStack
            Web Developer Man technologist
          </Typography>
        </div>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Languages</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Interests</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Friends</Typography>
      </Grid>
      <Grid item xs={12}>
        <Feed />
      </Grid>
    </Grid>
  )
}
export default Profile
