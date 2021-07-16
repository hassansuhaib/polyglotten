import React from 'react'

import Question from '../../components/Question/Question'
import Answer from '../../components/Answer/Answer'
import Container from '@material-ui/core/Container'


const Forum = () => {
  return (
    <Container>
      <h1>Forum</h1>
      <Question />
      <Answer />
    </Container>
  )
}

export default Forum
