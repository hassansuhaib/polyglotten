import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Button from '@material-ui/core/Button'

const Question = ({ question }) => {
  const { title, id } = question
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <Button component={RouterLink} to={`/forum/question/${id}`}>
        Detail
      </Button>
    </React.Fragment>
  )
}

export default Question
