import React from 'react'

const UserProfile = (props) => {
  return <h1>User Profile: {props.match.params.username}</h1>
}

export default UserProfile
