import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Intro from './Page/Intro'
import Home from './Page/Home'

class Router extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Home} />
          <Route exact path='/' render={() => <Intro />} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default Router
