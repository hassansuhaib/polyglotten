import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const Quizzes = () => {
  const classes = useStyles()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Quizzes'
  }, [])
  return (
    <div>
      <h1>Quizzes</h1>
    </div>
  )
}
export default Quizzes
