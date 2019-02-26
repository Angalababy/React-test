import React, {Component} from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  message
} from 'antd';

const Item = Form.Item
class LoginForm extends Component {

  checkpassword = (rule, value, callback) => {

    if (!value) {
      callback('必须输入密码')
    } else if (value.length < 4) {
      callback('密码长度必须超过4位')
    } else if (value > 11) {
      callback('密码长度不能超过11位')
    } else if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
      callback('密码只能包含大小写英文字母或是下划线')
    } else {
      callback()
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const{validateFields,resetFields}=this.props.form
    validateFields((error,values)=>{
      if(!error){
        //校验通过
        console.log('收集的表单数据',values);
      }else {
        //校验失败
        //重置密码
        resetFields(['password'])

        const errMsg=Object.values(error).reduce((prev,curr)=>{
return prev+curr.errors[0].message+ ' '
        },'')
        //提示错误
        message.error(errMsg)
      }
    })

  }

  render() {

    const {getFieldDecorator} = this.props.form
    return (
      <form className="Form" onSubmit={this.handleSubmit}>
        <Item>
          {
            getFieldDecorator(
              'username',
              {
                rules: [
                  {required: true, message: '请输入用户名'},
                  {min: 4, message: '用户名必须大于4位'},
                  {max: 11, message: '用户名不能超过11位'},
                  {pattern: /^[a-zA-Z0-9_]+$/, message: '必须是大小写英文字母或是下划线'}
                ],
              }
            )(<Input placeholder="用户名" prefix={<Icon type="user"/>}/>)
          }
        </Item>
        <Item>
          {
            getFieldDecorator(
              'password',
              {
                rules: [
                  {validator: this.checkpassword}
                ]
              }
            )
            (<Input placeholder="密码" type='password' prefix={<Icon type="lock"/>}/>)
          }
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" className="login-from-button">登录</Button>
        </Item>
      </form>
    )
  }
}


const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;