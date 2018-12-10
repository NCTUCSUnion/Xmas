import React from 'react'
import {Input,TextArea} from '../../Component/Input'
import SwipeableViews from 'react-swipeable-views'
import { bindKeyboard} from 'react-swipeable-views-utils'
import classNames from 'classnames'
import classes from './style.module.scss'
import Dropzone from 'react-dropzone'
import axios from 'axios'

let base_url = 'http://localhost:8080/_api'

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews)

class Intro extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      game: [0,0,0,0,0,0,0,0,0],
      index: 0,
      file: null,
      preview:null,
      title: '',
      description: ''
    }
    this.slide = this.slide.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.handleDel = this.handleDel.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }
  componentDidMount(){
    if(this.props.id){
      axios.post(`${base_url}/merryweek/load`,{
        id: this.props.id
      }).then(
        res => this.setState({game: [...(res.data.code.split('').map(e=>parseInt(e)))]})
      ).catch(err => console.log(err))
    }
   
  }
  slide(index){
    this.setState({index: index})
    window.scrollTo(0,0)
  }
  handleDrop (files) {
    if (files.length > 0) {
      this.setState({file: files[0],preview: URL.createObjectURL(files[0])})
  }
}
  handleDel (e) {
    this.setState({file: null,preview:null})
    e.stopPropagation()
  }
  handleUpload () {
    let fd = new FormData();
    fd.append('image', this.state.file)
    axios.post('https://api.imgur.com/3/image',fd,{
        headers:{
          'Authorization': `Client-ID aba6588bf16cc50` 
        }}
        ).then(
          res=>{
          if(this.props.id !== null){
            axios.post(`${base_url}/merryweek/upload`,{
              id: this.props.id,
              url: res.data.data.link,
              title: this.state.title,
              description: this.state.description,
              first: this.state.game[2] === 0
            }).catch(err => console.log(err))
          }}
        ).catch(err => console.log(err))
  }
  render(){
    let alt = ['繳交系學會費','繳交系學會費','攝影展：孤獨','Hansel & Gretel','PKM GO!','許願氣球','尋寶','耶舞購票','耶舞購票']
    return(
      <React.Fragment>
      <BindKeyboardSwipeableViews 
        enableMouseEvents
        index = {this.state.index}
        onChangeIndex = {this.slide}
        className={classes.swipeContainer}
        animateHeight
      >
        <section className={classes.section} key={0}>
          <h1 className={classes.title}>集點卡</h1>
          <p className={classes.list}>點擊方框可查看對應的活動名稱，詳細活動辦法請至 <span style={{color: '#3b5998'}}><i className="fab fa-facebook"></i></span> <a href='https://www.facebook.com/nctucs.assoc/'>交大資工系學會</a> 查詢</p>
          <div className={classNames(classes.board)}>
          
          <div className={classes.content}>
          {this.state.game.map(
              (status,index) => 
              <div className={classes.container} key={index}>
              <img 
                className={classes.point}
                src={status? './accept.png': './reject.png'} 
                alt={status? 'done': 'not yet'}
                />
                <div className={classes.alt}>{alt[index]}</div>
                </div>
            )}
           </div>
           </div>
          
        </section>
        <section className={classes.section} key={1}>
          <h1 className={classes.title}>活動辦法</h1>
          <p className={classes.list}>歡迎來到資工耶誕周 - 聖塔克勞資的集點網站！以下就為您說明這次的集點規則及注意事項 : </p>
          <p className={classes.list}>1. 每參加完一項活動會有專屬的<b>QRcode</b>提供參加者掃描，只要掃瞄完就能獲得當次活動對應的積分點數，每項活動只能獲得一次該活動提供的點數</p>
          <p className={classes.list}>2. 當集點累積至<b> 6 點</b>即可獲得本次耶誕周的獎品 - <b>KKBOX免費會員30天體驗券</b>！</p>
          <p className={classes.list}>3. 獎品將會在12/26及12/27日中午於工三大廳發放，屆時請出示本人集點網頁上的積分證明，若獎品領取有不方便者請私訊粉專</p>
          <p className={classes.list}>4. 資工系學會保有本次活動最終解釋權</p>
        </section>
        <section className={classes.section} key={2}>
        <h1 className={classes.title}>攝影展作品上傳</h1>

          <Input label='作品名稱' setValue={(e)=>this.setState({title:e.slice(0,10)})} value={this.state.title} />
          <TextArea label='作品說明' setValue={(e)=>this.setState({description:e.slice(0,50)})} value={this.state.description}/>
          <p>請將作品拖曳至方框內或點擊方框選取檔案上傳</p>
          <Dropzone
            accept='image/*'
            onDrop={this.handleDrop}
            className={classNames(this.state.file===null ? classes.upload:classes.disabledUpload)}
            activeClassName={classes.activeUpload}
            rejectClassName={classes.rejectUpload}
            disabledClassName={classes.disabledUpload}
            maxSize={10 * 1000 * 1000} // maxsize is 10MB
            multiple={false}
          >
          <div className={classes.content}>
          {this.state.file!== null
                ?(<div className={classes.file}>
                  <div className={classes.del} onClick={(e) => this.handleDel(e)}>
                    <i className='fas fa-times' />
                  </div>
                  <div className={classes.meta}>
                    <div className={classes.label}>{this.state.file.name}</div>
                    <div className={classes.label}>{(this.state.file.size / 1000 / 1000).toFixed(2)}MB</div>
                  </div>
                  <a className={classes.type} href={this.state.preview} rel='noopener noreferrer' target='_blank' onClick={(e) => { e.stopPropagation() }}>
                      <img src={this.state.preview} style={{height: '3rem'}} alt='preview' />
                  </a>
                </div>
              )
              : (
                <div className={classes.icon}> 
                <span><i className='fas fa-file-import'></i></span>
                  </div>
                )}
          </div>

          </Dropzone>
          <input className={classes.submit} type="submit"onClick={this.handleUpload} value="上傳"/>
          </section>
      </BindKeyboardSwipeableViews>
      <div className={classes.tabs}>
        <div className={classes.tab} onClick={()=>this.slide(0)} key={0}>
          {this.state.index === 0 ?
          <span className={classNames(classes.icon, classes.active)}>
            <i className='fas fa-address-card'></i>
          </span>:
          <span className={classes.icon}>
            <i className='far fa-address-card'></i>
          </span>
          }
          <div className={classNames(classes.attr,this.state.index === 0 && classes.active)}>集點卡</div>
        </div>

        <div className={classes.tab} onClick={()=>this.slide(1)} key={1}>
        {this.state.index === 1 ?
          <span className={classNames(classes.icon,classes.active)}>
            <i className='fas fa-box-open'></i>
          </span>:
          <span className={classes.icon}>
            <i className='fas fa-box'></i>
          </span>}
          <div className={classNames(classes.attr,this.state.index === 1 && classes.active)}>活動辦法</div>
        </div>
          <div className={classes.tab} onClick={()=>this.slide(2)} key={2}>
        {this.state.index === 2 ?
          <span className={classNames(classes.icon,classes.active)}>
            <i className='fas fa-camera-retro'></i>
          </span>:
          <span className={classes.icon}>
            <i className='fas fa-camera-retro'></i>
          </span>}
          <div className={classNames(classes.attr,this.state.index === 2 && classes.active)}>攝影展作品上傳</div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default Intro