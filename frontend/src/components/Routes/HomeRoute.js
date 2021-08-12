import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../../utils'

const HomeRoute = ({ landing: Landing, home: Home, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Home {...props} /> : <Landing {...props} />
    }
  />
)

export default HomeRoute
