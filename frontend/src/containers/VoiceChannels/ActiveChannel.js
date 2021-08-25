import React, { useState, useEffect, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import api from '../../api'
import * as urls from '../../constants'

import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Hidden, IconButton, Typography } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import HeadsetIcon from '@material-ui/icons/Headset'
import Avatar from '@material-ui/core/Avatar'

import ChannelChat from './ChannelChat'

const useStyles = makeStyles((theme) => ({}))

const Audio = ({ peer }) => {
  const ref = useRef()

  useEffect(() => {
    if (peer.on) {
      peer.on('stream', (stream) => {
        ref.current.srcObject = stream
      })
    }
  }, [])

  return (
    <React.Fragment>
      <audio autoPlay controls ref={ref} />
    </React.Fragment>
  )
}

const ActiveChannel = ({ roomID }) => {
  const classes = useStyles()
  const [peers, setPeers] = useState([])
  const [state, setState] = useState({
    channelData: null,
    message: '',
  })
  const socketRef = useRef()
  const userAudio = useRef()
  const peersRef = useRef([])

  const constraints = {
    audio: true,
  }
  console.log('Peers: ', peers)
  console.log('Message: ', state.message)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Active Channel'
    api
      .get(urls.channelsDetail(roomID))
      .then((response) => {
        console.log('We here:', response.data)
        setState({ ...state, channelData: response.data })
      })
      .catch((error) => console.log(error))
      .finally(() => {
        socketRef.current = io.connect('http://localhost:7000')
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            userAudio.current.srcObject = stream
            socketRef.current.emit('join room', roomID)
            socketRef.current.on('connect_error', (err) => {
              console.log(`connect_error due to ${err.message}`)
            })
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
            socketRef.current.on('receive message', (message) => {
              setState({ ...state, message: message })
            })
          })
          .catch((error) => console.log(error))
      })
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

  const handlePing = () => {
    console.log('Pinging')
    socketRef.current.emit('message', 'hello', roomID)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Voice Channels</Typography>
      </Grid>
      <Grid item xs={12}>
        <div>
          <Typography variant="h5">
            Topic: {state.channelData && state.channelData.topic}
          </Typography>
          <Typography variant="body1">
            Language: {state.channelData && state.channelData.language.title}
          </Typography>
        </div>
      </Grid>
      <Grid container item lg={6} spacing={3}>
        <Grid item xs={6}>
          <div>
            <audio autoPlay controls ref={userAudio} />
          </div>
        </Grid>
        {peers.map((peer) => (
          <Grid key={peer.peerID} item xs={6}>
            <Audio peer={peer.peer} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
export default ActiveChannel
