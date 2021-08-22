import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({}))

const Questions = ({ questions }) => {
  const classes = useStyles()
  return (
    <div>
      {questions.map((question) => (
        <p key={question.id}>{question.title}</p>
      ))}
    </div>
  )
}
export default Questions
