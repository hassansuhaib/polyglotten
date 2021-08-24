import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/auth'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles((theme) => ({}))

const Logout = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    handleLogout()
    setOpen(false)
  }
  return (
    <div>
      <ListItem disableGutters button onClick={handleClickOpen}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Logout'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Logout
