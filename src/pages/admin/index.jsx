import React, {Component} from 'react';
import {Layout} from 'antd'
import LeftNav from '../../components/leftNav'
import RightBottom from '../../components/RightBottom'
import RightTop from '../../components/RightTop'
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import MemoryUtils from '../../utils/memoryUtils'


const {Content,Sider,} = Layout;
class Admin extends Component {
  render () {
//登录验证（保证第一次渲染和重新渲染都要做登录验证
    const user =MemoryUtils.user

    if (!user|| !user._id){
      return <Redirect to="/login"/>
    }
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <LeftNav/>
          </Sider>
          <Layout >
            <RightTop/>
            <Content style={{margin: 18}}>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/role' component={Role}/>
                <Route path='/user' component={User}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Redirect to="/home" />
              </Switch>
            </Content>
            <RightBottom/>
          </Layout>
        </Layout>
    )
  }
}

export default Admin;