import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const Settings = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Settings'
  }, [])
  return (
    <div>
      <h1>Settings</h1>
    </div>
  )
}
export default Settings
