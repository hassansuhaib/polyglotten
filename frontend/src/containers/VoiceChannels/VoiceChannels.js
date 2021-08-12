import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const VoiceChannels = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Voice Channels'
  }, [])

  return (
    <div>
      <h1>Voice Channels</h1>
    </div>
  )
}
export default VoiceChannels
