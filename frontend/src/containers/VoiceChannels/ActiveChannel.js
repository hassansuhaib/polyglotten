import React, { useState, useEffect, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import api from '../../api'
import * as urls from '../../constants'

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
    if (props.peer.on) {
      props.peer.on('stream', (stream) => {
        ref.current.srcObject = stream
      })
    }
  }, [])

  return <audio ref={ref} controls autoPlay />
}

const ActiveChannel = ({ roomID }) => {
  const classes = useStyles()
  const [peers, setPeers] = useState([])
  const [state, setState] = useState(null)
  const socketRef = useRef()
  const userAudio = useRef()
  const peersRef = useRef([])

  const constraints = {
    audio: true,
  }
  console.log('Peers: ', peers)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Active Channel'
    api
      .get(urls.channelsDetail(roomID))
      .then((response) => {
        setState(response.data)
        socketRef.current = io.connect('http://localhost:7000')
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            userAudio.current.srcObject = stream
            socketRef.current.emit('join room', roomID)
            socketRef.current.on('all users', (users) => {
              console.log('All users', users)
              const peers = []
              users.forEach((userID) => {
                const peer = createPeer(userID, socketRef.current.id, stream)
                peersRef.current.push({
                  peerID: userID,
                  peer,
                })
                peers.push({
                  peerID: userID,
                  peer,
                })
                console.log(peers)
              })
              setPeers(peers)
            })

            socketRef.current.on('user joined', (payload) => {
              const peer = addPeer(payload.signal, payload.callerID, stream)
              peersRef.current.push({
                peerID: payload.callerID,
                peer,
              })

              const peerObj = {
                peer,
                peerID: payload.callerID,
              }

              setPeers((users) => [...users, peerObj])
            })

            socketRef.current.on('receiving returned signal', (payload) => {
              const item = peersRef.current.find((p) => p.peerID === payload.id)
              item.peer.signal(payload.signal)
            })

            socketRef.current.on('user left', (id) => {
              const peerObj = peersRef.current.find((p) => p.peerID == id)
              if (peerObj) {
                peerObj.peer.destroy()
              }
              const peers = peersRef.current.filter((p) => p.peerID !== id)
              peersRef.current = peers
              setPeers(peers)
            })
          })
          .catch((error) => console.log('Error accessing media devices', error))
      })
      .catch((error) => console.log(error))
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
          <div>
            <Typography variant="h4">Topic: {state && state.topic}</Typography>
            <Typography variant="h5">
              Language: {state && state.language.title}
            </Typography>
          </div>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <audio autoPlay controls ref={userAudio} />
          </Grid>
          {peers.map((peer) => (
            <Grid item xs={6}>
              <Audio key={peer.peerID} peer={peer} />
            </Grid>
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
