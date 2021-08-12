import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Typography } from '@material-ui/core'
import Feed from '../Feed/Feed'

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
    minWidth: '30px',
    padding: theme.spacing(1),
  },
  languages: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
}))

const Profile = () => {
  const classes = useStyles()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Profile'
  }, [])

  const renderLanguages = () => {
    return (
      <div className={classes.languages}>
        <div className={classes.language}>
          <Typography variant="subtitle1">German</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">German</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">German</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">German</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">German</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">German</Typography>
        </div>
      </div>
    )
  }

  const renderInterests = () => {
    return (
      <div className={classes.languages}>
        <div className={classes.language}>
          <Typography variant="subtitle1">Football</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">Football</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">Football</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">Football</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">Football</Typography>
        </div>
        <div className={classes.language}>
          <Typography variant="subtitle1">Football</Typography>
        </div>
      </div>
    )
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
            In love with the languages of the world | Learning: Flag of
            SpainFlag of Saudi Arabia | Speak: Flag of Pakistan🇺🇲 | FullStack
            Web Developer Man technologist
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
        <Typography variant="h5">Friends</Typography>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <Typography variant="body1" component="p">
              John Doe
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p">
              John Doe
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p">
              John Doe
            </Typography>
          </li>
          <li>
            <Typography variant="body1" component="p">
              John Doe
            </Typography>
          </li>
        </ul>
      </Grid>
      <Grid item xs={12}>
        <Feed />
      </Grid>
    </Grid>
  )
}
export default Profile
