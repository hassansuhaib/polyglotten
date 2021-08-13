import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({}))

const CreateChannel = (props) => {
  const classes = useStyles()
  return (
    <div>
      <h1>CreateChannel</h1>
      <Button variant="contained" component={RouterLink} to="/channels/active">
        Create Channel
      </Button>
    </div>
  )
}
export default CreateChannel
