import React from 'react'
import classes from './style.module.scss'
import { Link, withRouter } from 'react-router-dom'

const Navbar = withRouter((props) => (
  <div className={classes.navbar}>
    <Link
      className={classes.link}
      to={props.location.pathname === '/intro' ? '/user' : '/intro'}>
      {props.location.pathname === '/intro' ? '個人進度' : '活動介紹'}
    </Link>
  </div>
))

export default Navbar
