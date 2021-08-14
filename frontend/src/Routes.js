import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'

import Layout from './containers/Layout/Layout'
import Home from './containers/Home/Home'
import Landing from './containers/Landing/Landing'
import Login from './containers/Auth/Login'
import Register from './containers/Auth/Register'
import Profile from './containers/Profile/Profile'
import Forum from './containers/Forum/Forum'
import Settings from './containers/Settings/Settings'
import VoiceChannels from './containers/VoiceChannels/VoiceChannels'
import Quizzes from './containers/Quizzes/Quizzes'
import Setup from './containers/Setup/Setup'

import QuestionDetail from './components/Question/QuestionDetail'
import PrivateRoute from './components/Routes/PrivateRoute'
import HomeRoute from './components/Routes/HomeRoute'

const Routes = withRouter(({ location }) => {
  return (
    <div>
      <Layout>
        <Switch>
          <HomeRoute exact path="/" home={Home} landing={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/forum/:view" component={Forum} />
          <Route exact path="/forum/:view/:id" component={Forum} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/settings/:view" component={Settings} />
          <Route exact path="/settings/:view/:subview" component={Settings} />
          <Route exact path="/channels" component={VoiceChannels} />
          <Route exact path="/channels/:view" component={VoiceChannels} />
          <Route exact path="/tests" component={Quizzes} />
          <Route exact path="/tests/:view" component={Quizzes} />
          <PrivateRoute exact path="/:view" component={Home} />
          <PrivateRoute exact path="/:view/:username" component={Home} />
        </Switch>
      </Layout>
    </div>
  )
})

export default Routes
