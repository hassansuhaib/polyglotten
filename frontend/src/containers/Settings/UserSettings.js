import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const UserSettings = ({ content }) => {
  const classes = useStyles()
  return (
    <div>
      <h1>{content}</h1>
    </div>
  )
}
export default UserSettings
