import React from 'react'

const Answer = ({ answer }) => {
  const { content, id } = answer
  return (
    <React.Fragment>
      <p>{content}</p>
    </React.Fragment>
  )
}

export default Answer
