import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'

import Layout from './containers/Layout'
import Home from './containers/Home'
import Login from './containers/auth/Login'
import Register from './containers/auth/Register'

const Routes = withRouter(({ location }) => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Layout>
    </div>
  )
})

export default Routes
