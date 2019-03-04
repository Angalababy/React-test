import React, {Component} from 'react';
import MemoryUtils from  '../../utils/memoryUtils'
import {removeItem} from  '../../utils/storageUtils'
import {withRouter} from 'react-router-dom'
import dayjs from 'dayjs'
import {resWeather} from '../../api/ajax'

import {Row,Col,Modal} from 'antd'
import menuList from '../../config/menu-config'
import './index.less'
class RightTop extends Component {
state={
  day:dayjs().format('YYYY/MM/DD HH:mm:ss'),
  dayPictureUrl:'http://api.map.baidu.com/images/weather/day/qing.png',
  weather:'晴'
}

componentDidMount(){
 this.timer=setInterval(()=>{
   this.setState({
     day:dayjs().format('YYYY/MM/DD HH:mm:ss'),

   })
 },1000)
  this.getWeather()
}
getWeather=()=>{
  resWeather('北京')
    .then((res)=>{
      this.setState({
        dayPictureUrl:res.dayPictureUrl,
        weather:res.weather
      })
    })
    .catch((err)=>{
      console.log('请求天气失败~')
    })
}
componentWillUnmount(){
  clearInterval(this.timer)
}

  logOut=()=>{
    Modal.confirm({
      title: '您确认要退出登录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk:()=> {
//点击确认时触发的回调函数
        //清除用户信息
        removeItem();
        MemoryUtils.user='';
//返回登录页面
        this.props.history.replace('/login')

        console.log('OK');
      },

    });
  }
  getTitle=menu=>{
    let{pathname}=this.props.location
    if(pathname.indexOf('/product')===0){
      pathname='/product'
    }
    for (let i = 0; i <menu.length; i++) {
      let item=menu[i]
      if (item.children){
        // for (let j = 0; j <item.children.length; j++) {
        //  let cItem=item.children[j]
        //   if(cItem.key ===pathname){
        //    return cItem.title
        //   }
        // }
        const title =this.getTitle(item.children)
        if(title){
          return title
        }
      }else {
        if (item.key===pathname){
          return item.title
        }
      }
    }
  }

  render () {
  const{day,dayPictureUrl,weather}=this.state
//获取当前用户信息
    const {username}=MemoryUtils.user
    const title=this.getTitle(menuList)
    return (
      <div className="header">
        <Row className="top">
          <span>欢迎:{username}</span>
          <a href="javascript:void (0);" onClick={this.logOut}>退出</a>
        </Row>
        <Row className="bottom">
          <Col span={6} className="header-bottom-left">{title}</Col>
          <Col span={18} className="header-bottom-right">
            <span>{day}</span>
            <img className="weather-img" src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </Col>
        </Row>
      </div>
   )

  }
}

export default withRouter(RightTop)