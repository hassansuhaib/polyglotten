import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'

import Layout from './containers/Layout/Layout'
import Home from './containers/Home/Home'
import Login from './containers/Auth/Login'
import Register from './containers/Auth/Register'
import Profile from './containers/Profile/Profile'
import Forum from './containers/Forum/Forum'

const Routes = withRouter(({ location }) => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/profile/:username"
            render={(props) => <Profile key={props.location.key} {...props} />}
          />
          <Route exact path="/forum" component={Forum} />
        </Switch>
      </Layout>
    </div>
  )
})

export default Routes
