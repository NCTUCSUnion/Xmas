import React from 'react'
import classes from './style.module.scss'

const Home = () => (
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
    <div className={classes.login} onClick={() => { window.location.href = ('https://csunion.nctu.me/_api/auth/login?qs=') }}>
      <div className={classes.text}>登入</div>
    </div>
    <div className={classes.footer}>&copy; CopyRight 交大資工09系學會 <a href='https://github.com/NCTUCSUnion/Xmas'><i className='fab fa-github' /></a></div>
  </div>
)

export default Home
