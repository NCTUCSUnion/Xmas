import React from 'react'
import {BrowserRouter, Route, Switch, Redirect,withRouter} from 'react-router-dom'
import axios from 'axios'
import Intro from './Page/Intro'
import Home from './Page/Home'


const login = (WrappedComponent,qs) => {
  let qrcode = '';
  if(qs.length > 0){
    qrcode = qs.substr(1)
  }
  axios.get('https://csunion.nctu.me/_api/auth/check_id')
  .then(res=>{
      if(res.data === 0){
        if(qs.length > 0){
          window.location.href = (`https://csunion.nctu.me/_api/auth/login?qs=${qrcode}`)
        }
        else{
          return () => <Redirect to={{
            pathname: '/login'
          }} />
        }
      }
      else {
        return ()=><WrappedComponent id={res.data} qrcode={qrcode}/>
      }}
  )
}

const Router = () => {
  return(
  <BrowserRouter>
      <Routes/>
  </BrowserRouter>
)}

const Routes = withRouter(({history})=>(
  <Switch>
        <Route path='/login' component={Home} />
        <Route path='/' component={login(Intro,history.location.search)} />
  </Switch>
))

export default Router