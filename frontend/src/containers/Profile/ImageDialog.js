import React, { useState } from 'react'

import { postApi } from '../../api'
import * as urls from '../../constants'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: '0',
    right: 0,
    width: '100%',
    height: '100%',
  },
  createPost: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    '& > *': {
      maxHeight: '200px',
    },
  },
}))

const ImageDialog = ({ title, pState, pSetState, type }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [state, setState] = useState({
    image: null,
    content: '',
  })
  console.log('Image Dialog State: ', state)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setState({
      ...state,
      image: event.target.files[0],
      imageURL: URL.createObjectURL(event.target.files[0]),
    })
  }

  const handleSubmit = () => {
    let form_data = new FormData()
    if (state.image) {
      if (type === 'cover') {
        form_data.append('cover_photo', state.image, state.image.name)
      } else {
        form_data.append('profile_photo', state.image, state.image.name)
      }
    }
    postApi
      .patch(urls.profileUpdate(pState.pk), form_data)
      .then((response) => {
        let profileData = response.data
        if (profileData.cover_photo === null) {
          profileData.cover_photo =
            process.env.PUBLIC_URL + '/assets/covers/cover.jpg'
        }
        if (profileData.profile_photo === null) {
          profileData.profile_photo =
            process.env.PUBLIC_URL + '/assets/profile_photos/philip.jpg'
        }
        pSetState({ ...pState, ...profileData })
        handleClose()
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <IconButton
        className={classes.overlay}
        onClick={handleClickOpen}
      ></IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <div>
            <div className={classes.image}>
              <img src={state.imageURL} />
            </div>
            <input type="file" onChange={handleChange} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ImageDialog
