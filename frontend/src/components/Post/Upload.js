import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const Upload = (props) => {
  const classes = useStyles()
  const [state, setState] = useState({
    file: null,
  })

  const handleChange = (event) => {
    setState({
      file: URL.createObjectURL(event.target.files[0]),
    })
  }

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <img src={state.file} />
    </div>
  )
}
export default Upload
