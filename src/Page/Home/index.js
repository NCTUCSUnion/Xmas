import React from 'react'
import classes from './style.module.scss'

const Home = ()=>(
  <div className={classes.wallpaper}>
    <div className={classes.title}>
      聖塔克勞資
      <div className={classes.subtitle}>
        資工耶誕週集點活動
      </div>
    </div>
    <div className={classes.slogan}>
      12/12 - 12/21
      <div className={classes.subslo}>
        活動時間
      </div>
    </div>
    <div className={classes.login}>
      <div className={classes.text} onClick={()=>{window.location.href = ('https://csunion.nctu.me/_api/auth/login')}}>登入</div>
    </div>
  </div>
)

export default Home