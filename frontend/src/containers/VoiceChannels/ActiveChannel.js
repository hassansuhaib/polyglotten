import React, { useState, useEffect, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import io from 'socket.io-client'
import Peer from 'simple-peer'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Typography } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import HeadsetIcon from '@material-ui/icons/Headset'

const useStyles = makeStyles((theme) => ({}))

const Audio = (props) => {
  const ref = useRef()

  useEffect(() => {
    props.peer.on('stream', (stream) => {
      ref.current.srcObject = stream
    })
  }, [])

  return <audio ref={ref} controls autoPlay />
}

const ActiveChannel = ({ roomID }) => {
  const classes = useStyles()
  const [peers, setPeers] = useState([])
  const socketRef = useRef()
  const userAudio = useRef()
  const peersRef = useRef([])

  const constraints = {
    audio: true,
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Active Channel'
    socketRef.current = io.connect('http://localhost:8000')
    console.log(socketRef.current)
    console.log(peers)
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        userAudio.current.srcObject = stream
        socketRef.current.emit('join room', roomID)
        socketRef.current.on('all users', (users) => {
          console.log('All user')
          const peers = []
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream)
            peersRef.current.push({
              peerID: userID,
              peer,
            })
            peers.push(peer)
          })
          setPeers(peers)
        })

        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream)
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          })

          setPeers((users) => [...users, peer])
        })

        socketRef.current.on('receiving returned signal', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id)
          item.peer.signal(payload.signal)
        })
      })
      .catch((error) => console.log('Error accessing media devices', error))
  }, [])

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      })
    })

    return peer
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID })
    })

    peer.signal(incomingSignal)

    return peer
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Voice Channels</Typography>
        </Grid>
        <Grid item xs={12}>
          <div>
            <Typography variant="h5">Is it worth learning Spanish?</Typography>
            <div style={{ background: 'blue', borderRadius: '20px' }}>
              English
            </div>
          </div>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            User 1
          </Grid>
          <Grid item xs={6}>
            User 2
          </Grid>
          <Grid item xs={6}>
            User 3
          </Grid>
          <Grid item xs={6}>
            User 4
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <audio ref={userAudio} muted controls autoPlay />
          {peers.map((peer, index) => (
            <Audio key={index} peer={peer} />
          ))}
        </Grid>
        <Grid item xs={12}>
          <div>
            <IconButton component={RouterLink} to="/">
              <HighlightOffIcon />
            </IconButton>
            <IconButton>
              <MicOffIcon />
            </IconButton>
            <IconButton>
              <HeadsetIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
export default ActiveChannel
