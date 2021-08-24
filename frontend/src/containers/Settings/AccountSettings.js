import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import api from '../../api'
import * as urls from '../../constants'
import history from '../../history'

import { logout } from '../../store/actions/auth'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Button, IconButton, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const useStyles = makeStyles((theme) => ({}))

const AccountSettings = ({ view }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    username: '',
    email: '',
    old_password: '',
    new_password1: '',
    new_password2: '',
  })
  console.log('Account Settings state: ', state)

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleDelete = () => {
    console.log('Account deleted!')
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  const handlePassword = () => {
    api
      .post(urls.changePassword, state)
      .then((response) => {
        console.log('Response: ', response)
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }

  const handleUsername = () => {
    api
      .patch(urls.userUpdate(user.pk), { username: state.username })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  const handleEmail = () => {
    api
      .patch(urls.userUpdate(user.pk), { email: state.email })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  const renderOptions = () => {
    return (
      <React.Fragment>
        <Typography variant="h5">Account Settings</Typography>
        <List disablePadding>
          <ListItem
            button
            component={RouterLink}
            to="/settings/account/username"
          >
            <ListItemText primary="Username" />
          </ListItem>
          <ListItem button component={RouterLink} to="/settings/account/email">
            <ListItemText primary="Email" />
          </ListItem>
          <ListItem
            button
            component={RouterLink}
            to="/settings/account/password"
          >
            <ListItemText primary="Password" />
          </ListItem>
          <ListItem button onClick={handleDelete}>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </React.Fragment>
    )
  }

  const renderUsername = () => {
    return (
      <Grid container>
        <Grid item xs={1}>
          <IconButton onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item container xs={11} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Username</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Current Username: {user.username}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Change Username"
              variant="outlined"
              name="username"
              value={state.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleUsername}>
              Change Username
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderEmail = () => {
    return (
      <Grid container>
        <Grid item xs={1}>
          <IconButton onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item container xs={11} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Email</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>Current Email: {user.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Change Email"
              variant="outlined"
              name="email"
              value={state.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleEmail}>
              Change Email
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderPassword = () => {
    return (
      <Grid container>
        <Grid item xs={1}>
          <IconButton onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item container xs={11} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Password</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Current Password"
              variant="outlined"
              name="old_password"
              value={state.old_password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              name="new_password1"
              value={state.new_password1}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Again"
              variant="outlined"
              name="new_password2"
              value={state.new_password2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handlePassword}>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const renderView = () => {
    switch (view) {
      case 'username':
        return renderUsername()
      case 'email':
        return renderEmail()
      case 'password':
        return renderPassword()
      default:
        return renderOptions()
    }
  }

  return <React.Fragment>{renderView()}</React.Fragment>
}
export default AccountSettings
