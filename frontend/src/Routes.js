import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'

import Layout from './containers/Layout/Layout'
import Home from './containers/Home/Home'
import Login from './containers/Auth/Login'
import Register from './containers/Auth/Register'
import Profile from './containers/Profile/Profile'
import Forum from './containers/Forum/Forum'
import QuestionDetail from './components/Question/QuestionDetail'
import PrivateRoute from './components/Authentication/PrivateRoute'

const Routes = withRouter(({ location }) => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forum" component={Forum} />
          <Route
            exact
            path="/forum/question/:id"
            render={(props) => <QuestionDetail key={location.key} {...props} />}
          />
          <PrivateRoute
            exact
            path="/profile/:username"
            render={(props) => <Profile key={location.key} {...props} />}
          />
        </Switch>
      </Layout>
    </div>
  )
})

export default Routes
