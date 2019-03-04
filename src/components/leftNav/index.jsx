import React, {Component} from 'react';
import Img from '../../assets/images/logo.png'
import { Menu, Icon, Button } from 'antd';
import {NavLink,withRouter} from 'react-router-dom'
import menuList from '../../config/menu-config'

import './index.less'
const SubMenu = Menu.SubMenu;
const Item=Menu.Item
class LeftNav extends Component {
  createMenu=(menu)=>{
   return menu.map((item)=>{
      if(item.children){
      const {pathname}=this.props.location
        const result=item.children.find(item=>pathname===item.key)
        if(result){
           this.openKey=item.key
        }
      return  <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
        {this.createMenu(item.children)}
      </SubMenu>
      }else{
        return    <Item key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </NavLink>
        </Item>
      }
    })
  }

  componentWillMount(){
    this.menu=this.createMenu(menuList)
  }


  render () {
    let {pathname}=this.props.location
    if(pathname.indexOf('/product')===0){
      pathname='/product'
    }
    return (
     <div className="nav">
       <div>
         <NavLink to="/home" className="logo">
         <img src={Img} alt="logo"/>
         <h3>硅谷后台</h3>
         </NavLink>
       </div>
       <Menu mode="inline"
             theme="dark"
             defaultOpenKeys={[this.openKey]}
             selectedKeys={[pathname]}
             >
         {this.menu}
       </Menu>

     </div>
    )
  }
}

export default withRouter(LeftNav)