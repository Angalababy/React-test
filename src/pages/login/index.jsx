import React, {Component} from 'react';
import Img from '../../assets/images/logo.png'
import './index.less'
import LoginForm from '../../components/login-form'
import {reqLogin} from '../../api/ajax/'
import MemoryUtils from '../../utils/memoryUtils'
import {setItem} from '../../utils/storageUtils'

class Login extends Component {

  state={
    err:''
  }
  login=async (username,password)=>{
    const result=await reqLogin(username,password)
    console.log(result);
    if (result.status===0){
      //用户登录成功
      //保存用户信息
      setItem(result.data)
      MemoryUtils.user=result.data
      this.props.history.replace('/')
    }else{
      this.setState({
        err:result.msg
      })
    }
  }

  render () {
    let height=this.state.err ? 30:0
    return (
      <div className="login">
        <header className="login-header">
          <img src={Img} alt="logo"/>
          <h1>React:后台管理系统</h1>
        </header>
        <div className="section">
          <div className="err-form" style={{height}}>{this.state.err}</div>
          <h2>用户登录</h2>
          <LoginForm login={this.login}/>
        </div>
      </div>
      )
  }
}

export default Login;