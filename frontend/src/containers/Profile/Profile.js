import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}))

const Profile = () => {
  const classes = useStyles()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Profile'
  }, [])
  return (
    <div>
      <Container>
        <Typography variant="h3" component="h3">
          User profile
        </Typography>
      </Container>
    </div>
  )
}
export default Profile
