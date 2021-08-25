import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { logout } from '../../store/actions/auth'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: 'fixed',
    paddingLeft: theme.spacing(2),
  },
  heading: {},
}))

const RightBar = () => {
  const classes = useStyles()
  const [state, setState] = useState(null)

  console.log('Users state: ', state)

  useEffect(() => {
    const getUsers = () => {
      api
        .get(urls.recommendedUsers)
        .then((response) => setState(...response.data))
        .catch((error) => console.log(error))
    }
    getUsers()
  }, [])

  const renderUsers = () => {
    if (state) {
      return state.map((user_profile) => {
        return (
          <ListItem
            disableGutters
            button
            component={RouterLink}
            to={`/profile/${user_profile.user.username}`}
            key={user_profile.user.pk}
          >
            <ListItemAvatar>
              <Avatar src={user_profile.profile_photo} />
            </ListItemAvatar>
            <ListItemText
              primary={`${user_profile.user.first_name} ${user_profile.user.last_name}`}
            />
          </ListItem>
        )
      })
    } else {
      return (
        <ListItem>
          <ListItemText primary={'No recommendations.'} />
        </ListItem>
      )
    }
  }

  return (
    <div className={classes.sidebar}>
      <List
        aria-labelledby="nested-list-subheader"
        disablePadding
        subheader={
          <Typography variant="h6" component="p" id="nested-list-subheader">
            Recommended Users
          </Typography>
        }
      >
        {renderUsers()}
      </List>
    </div>
  )
}
export default RightBar
