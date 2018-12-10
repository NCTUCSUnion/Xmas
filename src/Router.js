import React from 'react'
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom'

import Intro from './Page/Intro'


const login = (Component) => {
   if (true)
    return () => <Component />
 }


const Router = () => (
  <BrowserRouter>
      <Switch>
      <Route path='/test_qr' />
        <Route path='/' render={()=><Intro/>} />
      </Switch>
  </BrowserRouter>
)

export default Router