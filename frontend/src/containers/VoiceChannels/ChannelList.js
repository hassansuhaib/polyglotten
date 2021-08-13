import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({}))

const ChannelList = (props) => {
  const classes = useStyles()
  return (
    <div>
      <h1>ChannelList</h1>
      <Button variant="contained" component={RouterLink} to="/channels/create">
        Create Channel
      </Button>
    </div>
  )
}
export default ChannelList
