import React, {Component} from 'react';
import Img from './images/logo.png'
import './index.less'
import LoginForm from '../../components/login-form'


class Login extends Component {

  render () {

    return (
      <div className="login">
        <header className="login-header">
          <img src={Img} alt="logo"/>
          <h1>React:后台管理系统</h1>
        </header>
        <div className="section">
          <h2>用户登录</h2>
          <LoginForm/>
        </div>
      </div>
      )
  }
}

export default Login;