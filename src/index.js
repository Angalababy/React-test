/**
 * Created by lenovo on 2019/2/26.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import  './assets/less/index.less'
import {BrowserRouter as Router} from 'react-router-dom'
import {getItem} from  './utils/storageUtils'
import  MemoryUtils from './utils/memoryUtils'


const user = getItem()

if(user&& user._id){
  MemoryUtils.user=user
}

ReactDOM.render(
  <Router><App/></Router>,
  document.getElementById('root'))